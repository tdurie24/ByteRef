import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NebularSharedModule } from '../shared/nebular-shared.module';
import { SyncfusionSharedModule } from '../shared/syncfusion-shared.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports: [
    NebularSharedModule,
    SyncfusionSharedModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: []
})
export class DashboardModule { }
