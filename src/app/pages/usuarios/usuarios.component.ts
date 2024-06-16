import { State } from '@/models/enums/state.enum';
import { Usuario } from '@/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  public State = State;
  public stateAtual: State = State.StateGrid;
  public usuarios: Usuario[] = [];

  public dadosForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null, Validators.required),
    nome: new UntypedFormControl(null, Validators.required),
    email: new UntypedFormControl(null, Validators.required),
    nomeUsuario: new UntypedFormControl(null, Validators.required),
    senha: new UntypedFormControl(null, Validators.required)
  });

  // paginação
  public page = 0;
  public size = 10;
  public first: boolean;
  public last: boolean;
  public totalElements = 0;

  constructor(private usuarioService: UsuarioService) {

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
    this.dadosForm.reset();
    this.stateAtual = State.StateDados;
  }

  salvarClick() {

  }

  alterarClick(usuario: Usuario) {
    console.log(usuario);
    this.stateAtual = State.StateDados;
    // getDados
    this.dadosForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      nomeUsuario: usuario.nomeUsuario,
      senha: usuario.senha
    });
  }

  eliminarClick(usuario: Usuario) {
    console.log(usuario);
  }

  cancelarClick() {
    this.stateAtual = State.StateGrid;
  }

}
