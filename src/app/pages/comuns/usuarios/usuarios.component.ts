import { OperacaoCadastro } from '../../../models/enums/operacao-cadastro.enum';
import { State } from '@/models/enums/state.enum';
import { Usuario } from '@/models/usuario.model';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalConfirmacaoComponent } from '@components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from '@services/app.service';
import { UsuariosModulosComponent } from './usuarios-modulos/usuarios-modulos.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    RouterLinkWithHref,
    NgbModule
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public State = State;
  public stateAtual: State = State.StateGrid;
  public operacaoCadastro: OperacaoCadastro = null;
  public usuarios: Usuario[] = [];

  // paginação
  public pagina: number = 1;
  public primeiraPagina: boolean;
  public ultimaPagina: boolean;
  public numeroDeRegistros: number = 0;
  public totalRegistros: number = 0;

  // filtro
  public filtroListaPaginada: FiltroListaPaginada = new FiltroListaPaginada();
  private filtroSubject = new Subject<string>();
  private filtroSubscription = new Subscription();

  public dadosForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null, Validators.required),
    nome: new UntypedFormControl(null, Validators.required),
    email: new UntypedFormControl(null, Validators.required),
    nomeUsuario: new UntypedFormControl(null, Validators.required),
    senha: new UntypedFormControl(null, Validators.required),
    status: new UntypedFormControl(1, Validators.required),
    perfis: new UntypedFormArray([
      new UntypedFormControl(), // Perfil 1
      new UntypedFormControl(), // Perfil 2
      new UntypedFormControl()  // Perfil 3
    ])
  });

  public listaStatus = [
    { id: 1, descricao: 'Ativo' },
    { id: 2, descricao: 'Inativo' }
  ];

  public listaQuantidadeRegistros = [10, 30, 50, 70, 90, 120];

  public listaOrdemRegistros = [
    { campo: 'id', direcao: 'ASC', descricao: 'ID Crescente' },
    { campo: 'id', direcao: 'DESC', descricao: 'ID Decrescente' },
    { campo: 'nome', direcao: 'ASC', descricao: 'Nome Crescente' },
    { campo: 'nome', direcao: 'DESC', descricao: 'Nome Decrescente' }
  ];

  private modalService = inject(NgbModal);

  constructor(private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.filtroSubscription = this.filtroSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.refresh();
    });

    this.getLista();
  }

  ngOnDestroy(): void {
    this.filtroSubscription.unsubscribe();
  }

  private getLista() {
    this.usuarioService.getListaPaginada(this.filtroListaPaginada).subscribe({
      next: (data) => {
        this.usuarios = data.content;
        this.primeiraPagina = data.first;
        this.ultimaPagina = data.last;
        this.numeroDeRegistros = data.numberOfElements;
        this.totalRegistros = data.totalElements;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  refresh() {
    this.getLista();
  }

  atualizarPagina() {
    this.filtroListaPaginada.pagina = this.pagina - 1;
    this.refresh();
  }

  onKeyUpFiltro(event: KeyboardEvent) {
    const filtro = (event.target as HTMLInputElement).value;
    this.filtroListaPaginada.filtro = filtro;
    this.filtroSubject.next(filtro);
  }

  onQtdRegistrosChange(event: Event): void {
    const qtdRegistros = Number((event.target as HTMLSelectElement).value);
    this.filtroListaPaginada.registrosPorPagina = qtdRegistros;
    this.refresh();
  }

  onOrdemRegistrosChange(event: Event): void {
    const selectedIndex = Number((event.target as HTMLSelectElement).value);
    const obj = this.listaOrdemRegistros[selectedIndex];
    this.filtroListaPaginada.ordem = obj.campo;
    this.filtroListaPaginada.direcao = obj.direcao;
    this.refresh();
  }

  get ordemSelecionada(): number {
    return this.listaOrdemRegistros.findIndex(
      (ordem) =>
        ordem.campo === this.filtroListaPaginada.ordem &&
        ordem.direcao === this.filtroListaPaginada.direcao
    );
  }

  inserirClick() {
    this.dadosForm.reset({
      status: 1
    });
    this.stateAtual = State.StateDados;
    this.operacaoCadastro = OperacaoCadastro.INSERIR;
  }

  alterarClick(usuario: Usuario) {
    this.usuarioService.findById(usuario.id).subscribe({
      next: (data) => {
        const usuarioRecuperado = data as Usuario;
        this.stateAtual = State.StateDados;
        this.operacaoCadastro = OperacaoCadastro.ALTERAR;
        this.dadosForm.patchValue({
          id: usuarioRecuperado.id,
          nome: usuarioRecuperado.nome,
          email: usuarioRecuperado.email,
          nomeUsuario: usuarioRecuperado.nomeUsuario,
          senha: usuarioRecuperado.senha,
          status: usuarioRecuperado.status
        });
        this.markPerfis(usuarioRecuperado.perfis);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar as informações do usuário!');
      }
    });
  }

  salvarClick() {
    let usuario = new Usuario(this.dadosForm.value);
    usuario.perfis = usuario.perfis.filter(item => item !== null);
    if (this.ehInserir()) {
      this.inserirUsuario(usuario);
    } else {
      this.alterarUsuario(usuario);
    }
  }

  private inserirUsuario(usuario: Usuario) {
    this.usuarioService.create(usuario).subscribe({
      next: (data) => {
        this.toastr.success('Usuário inserido com sucesso!');
        this.stateAtual = State.StateGrid;
        this.operacaoCadastro = null;
        this.getLista();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(this.appService.formatarErrosValidacao(err.error.erros), '', { enableHtml: true });
      }
    });
  }

  private alterarUsuario(usuario: Usuario) {
    this.usuarioService.update(usuario).subscribe({
      next: (data) => {
        this.toastr.success('Usuário alterado com sucesso!');
        this.stateAtual = State.StateGrid;
        this.operacaoCadastro = null;
        this.getLista();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(this.appService.formatarErrosValidacao(err.error.erros), '', { enableHtml: true });
      }
    });
  }

  eliminarClick(usuario: Usuario) {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent);

    modalRef.componentInstance.dados = {
      titulo: 'Confirmar exclusão',
      texto: `Realmente deseja excluir o usuário ${usuario.nome}?`
    };

    modalRef.result.then(
      (result) => {
        if (result) {
          this.usuarioService.delete(usuario.id).subscribe({
            next: (data) => {
              this.toastr.success('Usuário excluído com sucesso!');
              this.getLista();
            },
            error: (err) => {
              console.error(err);
              this.toastr.error('Erro ao excluir o usuário!');
            }
          });
        }
      }
    );
  }

  cancelarClick() {
    this.stateAtual = State.StateGrid;
    this.operacaoCadastro = null;
  }

  openModulos(usuario: Usuario) {
    const modalRef = this.modalService.open(UsuariosModulosComponent, { size: 'lg' });
    modalRef.componentInstance.usuario = usuario;
  }

  ehInserir(): boolean {
    return this.operacaoCadastro === OperacaoCadastro.INSERIR;
  }

  ehAlterar(): boolean {
    return this.operacaoCadastro === OperacaoCadastro.ALTERAR;
  }

  get perfisFormArray() {
    return this.dadosForm.get('perfis') as UntypedFormArray;
  }

  onCheckboxChange(e: any, index: number) {
    const perfis: UntypedFormArray = this.dadosForm.get('perfis') as UntypedFormArray;
    const perfilValue = Number(e.target.value);

    if (e.target.checked) {
      perfis.at(index).setValue(Number(perfilValue));
    } else {
      perfis.at(index).setValue(null);
    }
  }

  private markPerfis(perfisSelecionados: number[]) {
    const perfisFormArray = this.dadosForm.get('perfis') as UntypedFormArray;

    perfisFormArray.controls.forEach((control: UntypedFormControl) => {
      control.setValue(null);
    });

    perfisSelecionados.forEach((perfilIndex: number) => {
      if (perfilIndex >= 1 && perfilIndex <= perfisFormArray.length) {
        perfisFormArray.at(perfilIndex - 1).setValue(perfilIndex);
      }
    });
  }

  displayStatus(status: number): string {
    return this.listaStatus.find((s) => s.id === status).descricao;
  }

}
