import { UsuarioModuloAcesso } from '@/models/usuario-modulo-acesso.model';
import { Usuario } from '@/models/usuario.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UsuarioModuloService } from '@services/usuario-modulo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-modulos',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './usuarios-modulos.component.html',
  styleUrl: './usuarios-modulos.component.scss'
})
export class UsuariosModulosComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<UsuariosModulosComponent>);
  readonly usuario = inject<Usuario>(MAT_DIALOG_DATA);

  public usuariosModulos: UsuarioModuloAcesso[] = [];

  constructor(private usuarioModuloService: UsuarioModuloService,
              private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getLista();
  }

  private getLista() {
    this.usuarioModuloService.getListaModulos(this.usuario.id).subscribe({
      next: (data) => {
        this.usuariosModulos = data as Array<UsuarioModuloAcesso>;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar a lista de módulos do usuário!');
        this.fecharClick();
      }
    });
  }

  onCheckBoxAcessoChange(e: Event, modulo: UsuarioModuloAcesso) {
    const isChecked = (e.target as HTMLInputElement).checked;
    modulo.possuiAcesso = isChecked;

    this.usuarioModuloService.atualizarAcesso(this.usuario.id, modulo).subscribe({
      next: () => {
        this.toastr.success('Acesso atualizado com sucesso!');
        this.getLista();
      },
      error: (err) => {
        console.error('Erro ao atualizar o acesso do usuário:', err);
        this.toastr.error('Erro ao atualizar o acesso do usuário!');
      }
    });
  }

  fecharClick(): void {
    this.dialogRef.close();
  }

}
