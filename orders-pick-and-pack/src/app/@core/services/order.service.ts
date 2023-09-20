import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderModel} from "../models/order.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OrderItem} from "../models/order.item";
import {map} from "rxjs/operators";
import {DeliveryLocationDto} from "../models/delivery.location.dto";
import {FulfillmentLocationDto} from "../models/fulfillment.location.dto";
import {LogisticsModel} from "../models/logistics.model";

@Injectable({
    providedIn: 'root',
})
export class LogisticsService {


    private currentLogisticsSource: BehaviorSubject<LogisticsModel[] | null> = new BehaviorSubject<LogisticsModel[] | null>(null);
    currentLogisticsObservable = this.currentLogisticsSource.asObservable();

    currentSelectedLogisticModel: BehaviorSubject<LogisticsModel | null> = new BehaviorSubject<LogisticsModel | null>(null);
    currentSelectedOrderObservable = this.currentSelectedLogisticModel.asObservable();

    logisticsBaseUrl: string = environment.apiUrl + "logistics/"

    constructor(private httpClient: HttpClient) {

    }

    setSelectedOrder(logisticModel: LogisticsModel) {
        this.currentSelectedLogisticModel.next(logisticModel);
    }

    getLogistics() {
        this.httpClient.get<LogisticsModel[]>(this.logisticsBaseUrl).subscribe({
            next: response => {
                console.log(response);
                this.currentLogisticsSource.next(response);
            },
        });

    }

    updateLogistic(logisticsModel: LogisticsModel) {
        //submit item to server.
        this.httpClient.put(this.logisticsBaseUrl, logisticsModel)
            .subscribe({
                next: response => {
                    //get everything again
                    this.getLogistics();
                }
            });
    }

    deleteOrder(orderId: any) {

    }


    getItem(itemId: string) {
        // let item: OrderItem | undefined = this.makeItems().find(item => item.id === itemId);
        // return item;
    }


    addScannedItem(order: any, item: OrderItem) {
        //todo add the logic to add the scanned item into the items array of the selected order
    }
}
