import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {isDevMode, NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./@core/core.module";
import {ThemeModule} from "./@theme/theme.module";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {JwtModule} from "@auth0/angular-jwt";
import {
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule
} from "@nebular/theme";
import {CanDeactivateGuard} from "app/@core/guards/can-deactivate.guard";
import {VirtualizationService} from "@syncfusion/ej2-angular-lists";
import {LogisticsModule} from "./pages/logistics/logistics.module";
import {LoadingSpinnerComponent} from './components/components/loading-spinner/loading-spinner.component';
import {LoginComponent} from './pages/login/login.component';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {DatePipe} from '@angular/common';
import {LoadingIndicatorsInterceptor} from "./@core/interceptors/loading.spinner.interceptor";
import {JwtTokenInterceptor} from "./@core/interceptors/jwt.token.interceptor";
import {HttpErrorsInterceptor} from "./@core/interceptors/http.errors.interceptor";
import {NotFoundComponent} from "./pages/errors/not-found/not-found.component";
import {ServerErrorComponent} from "./pages/errors/server-error/server-error.component";
import {DropDownButtonModule} from "@syncfusion/ej2-angular-splitbuttons";
import {GridModule} from "@syncfusion/ej2-angular-grids";
import {LogisticsGridComponent} from './components/components/logistics-grid/logistics-grid.component';


export function tokenGetter(request) {

    if (request.url.includes("localhost") || request.url.includes("security")) {
        let token;
        // token = environment.user_token;
        if (isDevMode()) {
            token = localStorage.getItem("senwes_token_dev");
        } else {
            token = localStorage.getItem("senwes_token");
        }
        return token;
    }
}

@NgModule({
    declarations: [AppComponent,
        LoadingSpinnerComponent,
        LoginComponent,
        NotFoundComponent,
        ServerErrorComponent,

    ],
    imports: [
        BrowserModule,
        DialogModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LogisticsModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [
                    'localhost:4200',
                    "localhost:44305",
                    "localhost:44344",
                    "localhost:56661",
                    "localhost:59874",
                    "wsstaging.senwes.co.za",
                    "integration-qa.senwes.co.za",
                    "integration.senwes.co.za",
                    "wwwstaging.oneagri.co.za",
                    "ws.senwes.co.za",
                    "www.oneagri.co.za",
                ],
                disallowedRoutes: [],
            },
        }),
        FormsModule,
        ReactiveFormsModule,
        TextBoxModule,
        DropDownButtonModule,
        GridModule,
    ],
    providers: [CanDeactivateGuard,DatePipe, VirtualizationService,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorsInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},
    ],

    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
}
