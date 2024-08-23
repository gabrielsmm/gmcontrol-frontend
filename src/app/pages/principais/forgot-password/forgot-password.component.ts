import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ProfabricComponentsModule]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public forgotPasswordForm: UntypedFormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.forgotPasswordForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required)
        });
    }

    forgotPassword() {
      console.log(this.forgotPasswordForm);
      if (this.forgotPasswordForm.valid) {
      } else {
          this.toastr.error('Hello world!', 'Toastr fun!');
      }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
