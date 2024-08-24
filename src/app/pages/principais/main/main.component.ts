import { Usuario } from '@/models/usuario.model';
import {AppState} from '@/store/state';
import {ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {
    Component,
    HostBinding,
    OnInit,
    Renderer2
} from '@angular/core';
import {Store} from '@ngrx/store';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { HeaderComponent } from './header/header.component';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: true,
    imports: [HeaderComponent, MenuSidebarComponent, RouterOutlet, FooterComponent, ControlSidebarComponent, LoadingComponent]
})
export class MainComponent implements OnInit {
    @HostBinding('class') class = 'wrapper';
    public ui: Observable<UiState>;
    public appLoaded: boolean = false;

    constructor(
        private renderer: Renderer2,
        private store: Store<AppState>,
        private appService: AppService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
      this.buscarUsuarioLogado();

      this.ui = this.store.select('ui');
      this.renderer.removeClass(
          document.querySelector('app-root'),
          'login-page'
      );
      this.renderer.removeClass(
          document.querySelector('app-root'),
          'register-page'
      );
      this.renderer.addClass(
          document.querySelector('app-root'),
          'layout-fixed'
      );

      this.ui.subscribe(
          ({menuSidebarCollapsed, controlSidebarCollapsed, darkMode}) => {
              if (menuSidebarCollapsed) {
                  this.renderer.removeClass(
                      document.querySelector('app-root'),
                      'sidebar-open'
                  );
                  this.renderer.addClass(
                      document.querySelector('app-root'),
                      'sidebar-collapse'
                  );
              } else {
                  this.renderer.removeClass(
                      document.querySelector('app-root'),
                      'sidebar-collapse'
                  );
                  this.renderer.addClass(
                      document.querySelector('app-root'),
                      'sidebar-open'
                  );
              }

              if (controlSidebarCollapsed) {
                  this.renderer.removeClass(
                      document.querySelector('app-root'),
                      'control-sidebar-slide-open'
                  );
              } else {
                  this.renderer.addClass(
                      document.querySelector('app-root'),
                      'control-sidebar-slide-open'
                  );
              }

              if (darkMode) {
                  this.renderer.addClass(
                      document.querySelector('app-root'),
                      'dark-mode'
                  );
              } else {
                  this.renderer.removeClass(
                      document.querySelector('app-root'),
                      'dark-mode'
                  );
              }
          }
      );
    }

    buscarUsuarioLogado() {
      this.appService.buscarUsuarioLogado().subscribe(usuario => {
        if (usuario) {
          console.log(usuario);
          this.appLoaded = true;
        } else {
          this.toastr.error('Não foi possível recuperar o usuário logado, por favor tente novamente.');
          this.appService.deslogar();
        }
      });
    }

    onToggleMenuSidebar() {
      this.store.dispatch(new ToggleSidebarMenu());
    }

}
