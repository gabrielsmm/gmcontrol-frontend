/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import {environment} from './environments/environment';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@/app-routing.module';
import { uiReducer } from './app/store/ui/reducer';
import { authReducer } from './app/store/auth/reducer';
import { StoreModule } from '@ngrx/store';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokenInterceptorService } from '@services/token-interceptor.service';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

// if (environment.NODE_ENV === 'production') {
//     enableProdMode();
// }

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(ProfabricComponentsModule, CommonModule, BrowserModule, StoreModule.forRoot({ auth: authReducer, ui: uiReducer }), AppRoutingModule, ReactiveFormsModule, ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }), 
        // NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        FontAwesomeModule, NgbModule),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
        provideAnimationsAsync(),
        provideAnimations()
    ]
})
    .catch((err) => console.error(err));
