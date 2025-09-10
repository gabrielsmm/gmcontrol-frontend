import { State } from '@/models/enums/state.enum';
import { FiltroListaPaginada } from '@/models/filtro-lista-paginada.model';
import { Perfil } from '@/models/perfil.model';
import { Usuario } from '@/models/usuario.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLinkWithHref } from '@angular/router';
import { ModalConfirmacaoComponent } from '@components/modal-confirmacao/modal-confirmacao.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { OperacaoCadastro } from '../../../models/enums/operacao-cadastro.enum';
import { UsuarioStatus } from './../../../models/enums/usuario-status.enum';
import { PerfilService } from './../../../services/perfil.service';
import { UsuariosAcessosComponent } from './usuarios-acessos/usuarios-acessos.component';

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

  public UsuarioStatus = UsuarioStatus;
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

  public dadosForm: FormGroup;

  public listaPerfis: Perfil[] = [];

  public listaQuantidadeRegistros = [10, 30, 50, 70, 90, 120];

  public listaOrdemRegistros = [
    { campo: 'id', direcao: 'ASC', descricao: 'ID Crescente' },
    { campo: 'id', direcao: 'DESC', descricao: 'ID Decrescente' },
    { campo: 'nome', direcao: 'ASC', descricao: 'Nome Crescente' },
    { campo: 'nome', direcao: 'DESC', descricao: 'Nome Decrescente' }
  ];

  private modalService = inject(NgbModal);

  constructor(private usuarioService: UsuarioService,
              private perfilService: PerfilService,
              private toastr: ToastrService,
              private appService: AppService,
              private fb: FormBuilder
  ) {
    this.dadosForm = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      nomeUsuario: [null, Validators.required],
      senha: [null],
      status: [UsuarioStatus.ATIVO, Validators.required],
      perfis: this.fb.array([])
    });
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
    this.dadosForm.reset({ status: UsuarioStatus.ATIVO });
    (this.dadosForm.get('perfis') as FormArray).clear();
    this.stateAtual = State.StateDados;
    this.operacaoCadastro = OperacaoCadastro.INSERIR;
    this.getPerfisDisponiveis();
  }

  alterarClick(usuario: Usuario) {
    this.usuarioService.getDados(usuario.id).subscribe({
      next: (data) => {
        const usuarioRecuperado = data as Usuario;
        (this.dadosForm.get('perfis') as FormArray).clear();
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

        this.getPerfisDisponiveis(usuarioRecuperado.perfis);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar as informações do usuário!');
      }
    });
  }

  salvarClick() {
    const formValue = this.dadosForm.value;

    const perfisSelecionados = formValue.perfis
      .map((marcado: boolean, i: number) => marcado ? this.listaPerfis[i].id : null)
      .filter((id: number | null) => id !== null);

    let usuario = new Usuario({
      ...formValue,
      perfis: perfisSelecionados
    });

    if (this.ehInserir()) {
      this.inserirUsuario(usuario);
    } else {
      this.alterarUsuario(usuario);
    }
  }

  private inserirUsuario(usuario: Usuario) {
    this.usuarioService.inserir(usuario).subscribe({
      next: (data) => {
        this.toastr.success('Usuário inserido com sucesso!');
        this.stateAtual = State.StateGrid;
        this.operacaoCadastro = null;
        // Abrir acessos do usuário
        this.getLista();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(this.appService.formatarErrosValidacao(err.error.erros), '', { enableHtml: true });
      }
    });
  }

  private alterarUsuario(usuario: Usuario) {
    this.usuarioService.alterar(usuario).subscribe({
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
          this.usuarioService.eliminar(usuario.id).subscribe({
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

  openAcessos(usuario: Usuario) {
    const modalRef = this.modalService.open(UsuariosAcessosComponent, { size: 'lg' });
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

  private getPerfisDisponiveis(perfisUsuario?: Perfil[]) {
    this.perfilService.getPerfis().subscribe({
      next: (data) => {
        this.listaPerfis = data;
        this.carregarPerfis(perfisUsuario || []);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao carregar lista de perfis!');
      }
    });
  }

  carregarPerfis(perfisUsuario: Perfil[]) {
    const perfisFormArray = this.dadosForm.get('perfis') as FormArray;
    perfisFormArray.clear();

    this.listaPerfis.forEach(perfil => {
      const marcado = perfisUsuario.some(p => p.id === perfil.id);
      perfisFormArray.push(this.fb.control(marcado)); // true ou false
    });
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

  displayStatus(status: UsuarioStatus): string {
    switch (status) {
      case UsuarioStatus.ATIVO:
        return 'Ativo';
      case UsuarioStatus.INATIVO:
        return 'Inativo';
      default:
        return '';
    }
  }

}
