import {Routes} from '@angular/router';
import {MainComponent} from '@pages/principais/main/main.component';
import {BlankComponent} from '@pages/comuns/blank/blank.component';
import {LoginComponent} from '@pages/principais/login/login.component';
import {ProfileComponent} from '@pages/comuns/profile/profile.component';
import {RegisterComponent} from '@pages/principais/register/register.component';
import {DashboardComponent} from '@pages/comuns/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@pages/principais/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@pages/principais/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/comuns/main-menu/sub-menu/sub-menu.component';
import { UsuariosComponent } from '@pages/comuns/usuarios/usuarios.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
              path: '',
              component: DashboardComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
              path: 'usuarios',
              component: UsuariosComponent
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent,
    //     canActivate: [NonAuthGuard]
    // },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    // {
    //     path: 'recover-password',
    //     component: RecoverPasswordComponent,
    //     canActivate: [NonAuthGuard]
    // },
    {path: '**', redirectTo: ''}
];
