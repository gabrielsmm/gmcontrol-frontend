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
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, ProfabricComponentsModule]
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';

    public recoverPasswordForm: UntypedFormGroup;
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
        this.recoverPasswordForm = new UntypedFormGroup({
            password: new UntypedFormControl(null, Validators.required),
            confirmPassword: new UntypedFormControl(null, Validators.required)
        });
    }

    recoverPassword() {
        if (this.recoverPasswordForm.valid) {
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
