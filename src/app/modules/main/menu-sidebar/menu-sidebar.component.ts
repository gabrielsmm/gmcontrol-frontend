import { Usuario } from '@/models/usuario.model';
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
    public menu = MENU;
    public usuario: Usuario;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.usuario = this.appService.usuarioLogado;
    }
}

export const MENU = [
    {
        name: 'Principal',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Igrejas',
        iconClasses: 'fas fa-file',
        path: ['/blank']
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
