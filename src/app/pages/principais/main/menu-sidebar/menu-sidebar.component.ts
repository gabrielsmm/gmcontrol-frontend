import { UsuarioModulo } from '@/models/enums/usuario-modulo.enum';
import { UsuarioPerfil } from '@/models/enums/usuario-perfil.enum';
import { Usuario } from '@/models/usuario.model';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';
import { MenuItemComponent } from '../../../../components/menu-item/menu-item.component';
import { NgFor } from '@angular/common';
import { SidebarSearchComponent } from '../../../../components/sidebar-search/sidebar-search.component';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { RouterLink } from '@angular/router';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss'],
    standalone: true,
    imports: [RouterLink, ProfabricComponentsModule, SidebarSearchComponent, NgFor, MenuItemComponent]
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public usuario: Usuario;
    public menu = [];

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
      // obtendo o usuário logado
      this.usuario = this.appService.getUsuarioLogado();
      this.menu = this.filtrarMenu(MENU);

      this.ui = this.store.select('ui');
      this.ui.subscribe((state: UiState) => {
          this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
      });
    }

    private filtrarMenu(menu): any[] {
      const menuFiltrado = [];

      for (const item of menu) {
        if (this.possuiAcesso(item)) {
          const novoItem = { ...item };
          if (novoItem.children) {
            novoItem.children = this.filtrarMenu(novoItem.children);
          }
          menuFiltrado.push(novoItem);
        }
      }

      return menuFiltrado;
    }

    private possuiAcesso({ allowedProfiles, module }): boolean {
      return this.appService.usuarioPossuiAlgumPerfil(allowedProfiles) || this.appService.usuarioPossuiModulo(module);
    }

}

export const MENU = [
    {
        name: 'Início',
        iconClasses: 'fas fa-home',
        path: ['/']
    },
    {
      name: 'Usuários',
      iconClasses: 'fas fa-user',
      path: ['/usuarios'],
      allowedProfiles: [UsuarioPerfil.MASTER, UsuarioPerfil.ADMIN]
    },
    {
        name: 'Membresia Cristã',
        iconClasses: 'fas fa-church',
        path: ['/membresia-crista'],
        module: UsuarioModulo.MEMBRESIA_CRISTA,
        children: [
          {
            name: 'Cadastros',
            iconClasses: 'fas fa-address-card',
            module: UsuarioModulo.MEMBRESIA_CRISTA,
            path: ['/blank']
          },
          {
            name: 'Lançamentos',
            iconClasses: 'fas fa-money-check-alt',
            module: UsuarioModulo.MEMBRESIA_CRISTA,
            path: ['/blank']
          },
          {
            name: 'Relatórios',
            iconClasses: 'fas fa-print',
            module: UsuarioModulo.MEMBRESIA_CRISTA,
            path: ['/blank']
          }
        ]
    },
    // {
    //     name: 'Main Menu',
    //     iconClasses: 'fas fa-folder',
    //     children: [
    //         {
    //             name: 'Sub Menu',
    //             iconClasses: 'far fa-address-book',
    //             path: ['/sub-menu-1']
    //         },
    //         {
    //             name: 'Blank',
    //             iconClasses: 'fas fa-file',
    //             path: ['/sub-menu-2']
    //         }
    //     ]
    // }
];
