import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticsComponent } from './logistics.component';
import { NebularSharedModule } from '../shared/nebular-shared.module';
import { SyncfusionSharedModule } from '../shared/syncfusion-shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventsRoutingModule } from './logistics-routing.module';
import { DropDownButtonModule } from "@syncfusion/ej2-angular-splitbuttons";
import { LogisticsDetailComponent } from './logistics-detail-modal/logistics-detail.component';
import {DialogAllModule} from "@syncfusion/ej2-angular-popups";
import { ScanItemComponent } from './scan.item/scan.item.component';
import { LogisticDetailsFullComponent } from './logistic-details-full/logistic-details-full.component';
import {ReusableOrdersGridComponent} from "./reusable-orders-grid/reusable-orders-grid.component";

@NgModule({
  declarations: [LogisticsComponent,
      LogisticsDetailComponent,ReusableOrdersGridComponent, ScanItemComponent, LogisticDetailsFullComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EventsRoutingModule,
        NebularSharedModule,
        SyncfusionSharedModule,
        DropDownButtonModule,
        DialogAllModule,
        FormsModule,
    ]
})
export class LogisticsModule { }
