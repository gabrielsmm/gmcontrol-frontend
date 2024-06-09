import { PerfilUsuario, Usuario } from '@/models/usuario.model';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
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
      this.appService.getUsuarioLogado().subscribe(usuarioLogado => {
        this.usuario = usuarioLogado;
        this.filtrarMenuByPerfisUsuario(this.usuario.perfis);
      });

      this.ui = this.store.select('ui');
      this.ui.subscribe((state: UiState) => {
          this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
      });
    }

    private filtrarMenuByPerfisUsuario(perfis: []): void {
      this.menu = this.filtrarMenu(MENU, perfis.map(perfil => perfil as PerfilUsuario));
    }

    private filtrarMenu(menu, userProfiles: PerfilUsuario[]): [] {
      return menu
        .filter(item => this.possuiAcesso(item, userProfiles))
        .map(item => ({
          ...item,
          children: item.children ? this.filtrarMenu(item.children, userProfiles) : undefined
        }));
    }

    private possuiAcesso(item, perfisUsuario: PerfilUsuario[]): boolean {
      if (!item.allowedProfiles) {
        return true; // Se o item não tiver restrição de perfis, qualquer usuário pode acessá-lo.
      }
      return item.allowedProfiles.some(profile => perfisUsuario.includes(profile));
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
      path: ['/blank'],
      allowedProfiles: [PerfilUsuario.MASTER, PerfilUsuario.ADMIN]
    },
    {
        name: 'Membresia Cristã',
        iconClasses: 'fas fa-church',
        children: [
          {
            name: 'Cadastros',
            iconClasses: 'fas fa-address-card',
            path: ['/blank']
          },
          {
            name: 'Lançamentos',
            iconClasses: 'fas fa-money-check-alt',
            path: ['/blank']
          },
          {
            name: 'Relatórios',
            iconClasses: 'fas fa-print',
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
