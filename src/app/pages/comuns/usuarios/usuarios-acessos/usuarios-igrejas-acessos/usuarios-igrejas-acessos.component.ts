import { UsuarioIgrejaAcesso } from '@/models/usuario-igreja-acesso.model';
import { Usuario } from '@/models/usuario.model';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioIgrejaService } from '@services/usuario-igreja.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-igrejas-acessos',
  standalone: true,
  imports: [],
  templateUrl: './usuarios-igrejas-acessos.component.html',
  styleUrl: './usuarios-igrejas-acessos.component.scss'
})
export class UsuariosIgrejasAcessosComponent implements OnInit {

  @Input() usuario: Usuario;

  public usuariosIgrejas: UsuarioIgrejaAcesso[] = [];

  constructor(private usuarioIgrejaService: UsuarioIgrejaService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getListaIgrejas();
  }

  private getListaIgrejas() {
    this.usuarioIgrejaService.getListaIgrejas(this.usuario.id).subscribe({
      next: (data) => {
        this.usuariosIgrejas = data as Array<UsuarioIgrejaAcesso>;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar a lista de igrejas do usuário!');
      }
    });
  }

  onCheckBoxAcessoChange(e: Event, igreja: UsuarioIgrejaAcesso) {
    const isChecked = (e.target as HTMLInputElement).checked;
    igreja.possuiAcesso = isChecked;

    this.usuarioIgrejaService.atualizarAcesso(this.usuario.id, igreja).subscribe({
      next: () => {
        this.toastr.success('Acesso atualizado com sucesso!');
        this.getListaIgrejas();
      },
      error: (err) => {
        console.error('Erro ao atualizar o acesso do usuário:', err);
        this.toastr.error('Erro ao atualizar o acesso do usuário!');
      }
    });
  }

}
