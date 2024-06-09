import { Usuario } from '@/models/usuario.model';
import {AppState} from '@/store/state';
import {ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {
    AfterViewInit,
    Component,
    HostBinding,
    OnInit,
    Renderer2
} from '@angular/core';
import {Store} from '@ngrx/store';
import { AppService } from '@services/app.service';
import { UsuarioService } from '@services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    @HostBinding('class') class = 'wrapper';
    public ui: Observable<UiState>;
    public appLoaded: boolean = false;

    constructor(
        private renderer: Renderer2,
        private store: Store<AppState>,
        private appService: AppService,
        private usuarioService: UsuarioService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
      this.getUsuarioLogado();

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

    getUsuarioLogado() {
      this.usuarioService.getUsuarioLogado().subscribe({
        next: (data) => {
          const usuarioLogado: Usuario = data as Usuario;
          if (usuarioLogado) {
            this.appService.usuarioLogado = usuarioLogado;
          } else {
            this.toastr.error('Não foi possível recuperar o usuário logado, por favor tente novamente.');
            this.appService.deslogar();
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Ocorreu um erro de conexão com os nossos servidores, por favor tente novamente.');
          this.appService.deslogar();
        }
      });
    }

    onToggleMenuSidebar() {
      this.store.dispatch(new ToggleSidebarMenu());
    }

    ngAfterViewInit() {
      setTimeout(() => {
        this.appLoaded = true;
      });
    }
}
