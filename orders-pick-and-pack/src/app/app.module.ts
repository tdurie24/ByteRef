import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { isDevMode, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { JwtModule } from "@auth0/angular-jwt";
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from "@nebular/theme";
import { CanDeactivateGuard } from "app/@core/guards/can-deactivate.guard";
import { VirtualizationService } from "@syncfusion/ej2-angular-lists";
import { LogisticsModule } from "./pages/logistics/logistics.module";
import { LoadingSpinnerComponent } from './components/components/loading-spinner/loading-spinner.component';

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
  declarations: [AppComponent, LoadingSpinnerComponent],
  imports: [
    BrowserModule,
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
          "localhost:4200",
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
  ],
  providers: [CanDeactivateGuard, VirtualizationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
