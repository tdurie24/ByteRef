
import {DateTime} from "@syncfusion/ej2-angular-charts";
import {OrderItem} from "./order.item";
import { FulfillmentLocationDto } from './fulfillment.location.dto';
import { DeliveryLocationDto } from './delivery.location.dto';

export interface OrderModel {
    id:string,
    orderNumber: number,
    total:number,
    LogisticsStatus: string,
    AssignedTo: string,
    DeliveryLocationId: string,
    FulfillmentLocationId: string,
    DeliveryLocationDto:DeliveryLocationDto,
    FulfillmentLocationDto:FulfillmentLocationDto,
    orderItems:OrderItem[],
    totalItems:number,
    dateModified: Date,
    orderDate: Date,
    dateCreated: Date,

}

