import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'app/@core/guards/auth.guard';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      { path: 'logistics', loadChildren: () => import('./logistics/logistics.module').then(m => m.LogisticsModule) },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class PagesRoutingModule {

}
