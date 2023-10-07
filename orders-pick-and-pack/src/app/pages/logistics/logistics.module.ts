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
import {LogisticsGridComponent} from "../../components/components/logistics-grid/logistics-grid.component";
import { CollectionDetailsComponent } from './logistics-detail-modal/collection-details/collection-details.component';
import {NbLayoutModule, NbTableModule} from "@nebular/theme";
import { DeliveryDetailsComponent } from './logistics-detail-modal/delivery-details/delivery-details.component';
import { FullfilmentDetailsComponent } from './logistics-detail-modal/fullfilment-details/fullfilment-details.component';
import { OrderItemsGridComponent } from './logistics-detail-modal/order-items-grid/order-items-grid.component';
import { OrderItemDetailsComponent } from './logistics-detail-modal/order-item-details/order-item-details.component';

@NgModule({
  declarations: [LogisticsComponent,
      LogisticsDetailComponent,
      LogisticsGridComponent,
      CollectionDetailsComponent,
      DeliveryDetailsComponent,
      FullfilmentDetailsComponent,
      OrderItemsGridComponent,
      OrderItemDetailsComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EventsRoutingModule,
        NebularSharedModule,
        SyncfusionSharedModule,
        DropDownButtonModule,
        DialogAllModule,
        FormsModule,
        NbTableModule,
        NbLayoutModule,
    ]
})
export class LogisticsModule { }
