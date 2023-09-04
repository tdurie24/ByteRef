import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LogisticsComponent } from './logistics.component';
import { CanDeactivateGuard } from 'app/@core/guards/can-deactivate.guard';


const routes: Routes = [{ path: 'logistics', component: LogisticsComponent, canDeactivate: [CanDeactivateGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
