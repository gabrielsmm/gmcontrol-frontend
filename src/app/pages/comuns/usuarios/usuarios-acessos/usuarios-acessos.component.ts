import { Usuario } from '@/models/usuario.model';

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { UsuariosModulosAcessosComponent } from "./usuarios-modulos-acessos/usuarios-modulos-acessos.component";
import { UsuariosIgrejasAcessosComponent } from "./usuarios-igrejas-acessos/usuarios-igrejas-acessos.component";

@Component({
  selector: 'app-usuarios-acessos',
  standalone: true,
  imports: [
    NgbNavModule,
    UsuariosModulosAcessosComponent,
    UsuariosIgrejasAcessosComponent
],
  templateUrl: './usuarios-acessos.component.html',
  styleUrl: './usuarios-acessos.component.scss'
})
export class UsuariosAcessosComponent implements OnInit, OnDestroy {

  @Input() usuario: Usuario;

  activeModal = inject(NgbActiveModal);

  public tabIndex = 1;
  public acessoMembresiaCrista = false;

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.appService.buscarUsuarioLogado(true).subscribe();
    // TODO: Notificar menu-sidebar para recarregar a lista do menu
  }

  onChangeTab(tabIndex: number = 1): void {
    this.tabIndex = tabIndex;
  }

  onChangeAcessoMembresiaCrista(acesso: boolean = false): void {
    this.acessoMembresiaCrista = acesso;
  }

  fecharClick(): void {
    this.activeModal.close();
  }

}
