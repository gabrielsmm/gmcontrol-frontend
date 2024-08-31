/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';


import {environment} from './environments/environment';
import { AppComponent } from './app/app.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { uiReducer } from './app/store/ui/reducer';
import { authReducer } from './app/store/auth/reducer';
import { StoreModule } from '@ngrx/store';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokenInterceptorService } from '@services/token-interceptor.service';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from '@/app.routes';
import { CustomAdapter, CustomDateParserFormatter } from '@/utils/date';

if (environment.NODE_ENV === 'production') {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
        importProvidersFrom(ProfabricComponentsModule, CommonModule, BrowserModule, StoreModule.forRoot({ auth: authReducer, ui: uiReducer }), ReactiveFormsModule, ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        // NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        FontAwesomeModule, NgbModule),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
        provideAnimationsAsync(),
        provideAnimations(),
        {provide: NgbDateAdapter, useClass: CustomAdapter},
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ]
})
.catch((err) => console.error(err));
