import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { OrderDetailsComponent } from './logistics/order.details/order.details.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,

  ],
  declarations: [
    PagesComponent,
    OrderDetailsComponent,
  ],
})

export class PagesModule {
}
