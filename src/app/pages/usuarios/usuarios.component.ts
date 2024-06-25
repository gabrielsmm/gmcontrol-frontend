import { OperacaoCadastro } from './../../models/enums/operacao-cadastro.enum';
import { State } from '@/models/enums/state.enum';
import { Usuario } from '@/models/usuario.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacaoComponent } from '@components/dialog-confirmacao/dialog-confirmacao.component';
import { AppService } from '@services/app.service';
import { UsuariosModulosComponent } from './usuarios-modulos/usuarios-modulos.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class UsuariosComponent implements OnInit {

  public State = State;
  public stateAtual: State = State.StateGrid;
  public operacaoCadastro: OperacaoCadastro = null;
  public usuarios: Usuario[] = [];

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

  // paginação
  public page = 0;
  public size = 10;
  public first: boolean;
  public last: boolean;
  public totalElements = 0;

  public listaStatus = [
    { id: 1, descricao: 'Ativo' },
    { id: 2, descricao: 'Inativo' }
  ]

  readonly dialog = inject(MatDialog);

  constructor(private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private appService: AppService
  ) {

  }

  ngOnInit(): void {
    // Validar login
    this.getLista();
  }

  private getLista(page?: number) {
    this.usuarioService.findPage(page).subscribe({
      next: (data) => {
        this.usuarios = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalElements = data.totalElements;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  atualizarPagina(page: number) {
    this.page = page;
    this.getLista(this.page);
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
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: {
        titulo: 'Confirmar exclusão',
        texto: `Realmente deseja excluir o usuário ${usuario.nome}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
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
    });
  }

  cancelarClick() {
    this.stateAtual = State.StateGrid;
    this.operacaoCadastro = null;
  }

  openModulos(usuario: Usuario) {
    this.dialog.open(UsuariosModulosComponent, {
      height: '800px',
      width: '800px',
      maxWidth: '100vw',
      data: usuario
    });
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
