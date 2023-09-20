import {DateTime} from "@syncfusion/ej2-angular-charts";
import {OrderItem} from "./order.item";
import {FulfillmentLocationDto} from './fulfillment.location.dto';
import { DeliveryLocationDto } from './delivery.location.dto';

export interface OrderModel {
    id?: string,
    OrderNumber?: any,
    total?: number,
    LogisticsStatus?: string,
    AssignedTo?: string,
    DeliveryLocationId?: string,
    FulfillmentLocationId?: string,
    DeliveryLocationDto?: DeliveryLocationDto,
    FulfillmentLocationDto?: FulfillmentLocationDto,
    OrderItems?: OrderItem[],
    totalItems?: number,
    dateModified?: Date,
    orderDate?: Date,
    dateCreated?: Date,
}