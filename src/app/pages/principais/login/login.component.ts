import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { Usuario } from '@/models/usuario.model';
import { HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ProfabricComponentsModule } from '@profabric/angular-components';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ProfabricComponentsModule]
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';

    public usuario: Usuario = new Usuario();
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            usuario: new UntypedFormControl(null, Validators.required),
            senha: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (!this.loginForm.valid) {
          this.toastr.error('Informe as credenciais!');
          return;
        }

        this.usuario = new Usuario(this.loginForm.value);
        this.isAuthLoading = true;
        this.authService.login(this.usuario).subscribe({
          next: (data: HttpResponse<any>) => {
            const token = data.headers.get('Authorization');
            if (token) {
              localStorage.setItem('token', token);
              this.appService.usuarioAutenticado = true;
              this.router.navigate(['/main']);
            }
          },
          error: (err) => {
            this.isAuthLoading = false;
            console.error(err);
            this.toastr.error('Usuário ou senha inválidos!');
          },
          complete: () => {
            this.isAuthLoading = false;
          }
        });
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
