import {ItemModel} from "./item.model";

export interface Order {
    OrderNumber: number,
    LogisticsStatus: string,
    AssignedTo: string,
    TotalItems:number,
    DateUpdated: Date,
    DateCreated: Date,
    Items: ItemModel[]
}