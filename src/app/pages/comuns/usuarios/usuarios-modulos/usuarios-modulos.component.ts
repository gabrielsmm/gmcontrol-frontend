import { UsuarioModuloAcesso } from '@/models/usuario-modulo-acesso.model';
import { Usuario } from '@/models/usuario.model';

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { UsuarioModuloService } from '@services/usuario-modulo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-modulos',
  standalone: true,
  imports: [],
  templateUrl: './usuarios-modulos.component.html',
  styleUrl: './usuarios-modulos.component.scss'
})
export class UsuariosModulosComponent implements OnInit, OnDestroy {

  @Input() usuario: Usuario;

  activeModal = inject(NgbActiveModal);

  public usuariosModulos: UsuarioModuloAcesso[] = [];

  constructor(private usuarioModuloService: UsuarioModuloService,
              private toastr: ToastrService,
              private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.getLista();
  }

  ngOnDestroy(): void {
    this.appService.buscarUsuarioLogado(true).subscribe();
    // TODO: Notificar menu-sidebar para recarregar a lista do menu
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
    this.activeModal.close();
  }

}
