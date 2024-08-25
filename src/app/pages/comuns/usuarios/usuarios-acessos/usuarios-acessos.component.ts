import { UsuarioModuloAcesso } from '@/models/usuario-modulo-acesso.model';
import { Usuario } from '@/models/usuario.model';

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { UsuarioModuloService } from '@services/usuario-modulo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-acessos',
  standalone: true,
  imports: [
    NgbModule
  ],
  templateUrl: './usuarios-acessos.component.html',
  styleUrl: './usuarios-acessos.component.scss'
})
export class UsuariosAcessosComponent implements OnInit, OnDestroy {

  @Input() usuario: Usuario;

  activeModal = inject(NgbActiveModal);

  public usuariosModulos: UsuarioModuloAcesso[] = [];
  public tabIndex = 1;

  constructor(private usuarioModuloService: UsuarioModuloService,
              private toastr: ToastrService,
              private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.getListaModulos();
  }

  ngOnDestroy(): void {
    this.appService.buscarUsuarioLogado(true).subscribe();
    // TODO: Notificar menu-sidebar para recarregar a lista do menu
  }

  private getListaModulos() {
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
        this.getListaModulos();
        if (modulo.codigo == 1 && modulo.possuiAcesso) { // Membresia cristã
          setTimeout(() => {
            this.tabIndex = 2;
          }, 500);
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar o acesso do usuário:', err);
        this.toastr.error('Erro ao atualizar o acesso do usuário!');
      }
    });
  }

  get possuiAcessoMembresiaCrista(): boolean {
    return this.usuariosModulos.some(m => m.codigo == 1 && m.possuiAcesso);
  }

  fecharClick(): void {
    this.activeModal.close();
  }

}
