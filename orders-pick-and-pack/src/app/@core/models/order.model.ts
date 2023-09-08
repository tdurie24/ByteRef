import {OrderItem} from "./order.item";
import {DateTime} from "@syncfusion/ej2-angular-charts";

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

export interface DeliveryLocationDto{

}
export interface FulfillmentLocationDto{

}
export interface OrderItem{

}
