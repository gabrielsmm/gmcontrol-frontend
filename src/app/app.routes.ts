import {Routes} from '@angular/router';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';

export const APP_ROUTES: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/principais/main/main.component').then(m => m.MainComponent),
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
          {
            path: '',
            loadComponent: () => import('./pages/comuns/dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
          {
            path: 'profile',
            loadComponent: () => import('./pages/comuns/profile/profile.component').then(m => m.ProfileComponent)
          },
          {
            path: 'blank',
            loadComponent: () => import('./pages/comuns/blank/blank.component').then(m => m.BlankComponent)
          },
          {
            path: 'sub-menu-1',
            loadComponent: () => import('./pages/comuns/main-menu/sub-menu/sub-menu.component').then(m => m.SubMenuComponent)
          },
          {
            path: 'sub-menu-2',
            loadComponent: () => import('./pages/comuns/blank/blank.component').then(m => m.BlankComponent)
          },
          {
            path: 'usuarios',
            loadComponent: () => import('./pages/comuns/usuarios/usuarios.component').then(m => m.UsuariosComponent)
          },
          {
            path: 'igrejas',
            loadComponent: () => import('./pages/comuns/igrejas/igrejas.component').then(m => m.IgrejasComponent)
          },
          {
            path: 'membresia-crista',
            loadChildren: () => import('./pages/membresia-crista/membresia-crista.routes').then(m => m.MEMBRESIA_CRISTA_ROUTES)
          }
      ]
    },
    {
      path: 'login',
      loadComponent: () => import('./pages/principais/login/login.component').then(m => m.LoginComponent),
      canActivate: [NonAuthGuard]
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent,
    //     canActivate: [NonAuthGuard]
    // },
    {
      path: 'forgot-password',
      loadComponent: () => import('./pages/principais/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
      canActivate: [NonAuthGuard]
    },
    // {
    //     path: 'recover-password',
    //     component: RecoverPasswordComponent,
    //     canActivate: [NonAuthGuard]
    // },
    { path: '**', redirectTo: '' }
];
