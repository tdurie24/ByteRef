import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";
import {LogisticsStatus} from "../models/logistics.status";

@Injectable({
    providedIn: 'root'
})
export class LogisticsStatusService {

   // private statusBaseUrl = environment.api_orders_base_url + "Order_Status_All";
     private statusBaseUrl = environment.api_orders_base_url + "Order/Status/All";
    //'https://integration-qa.senwes.co.za/service/retail/b2c_orders/api/Order/Status/All
    private logisticStatuses: LogisticsStatus[] = [];
    private logisticsStatusSource: BehaviorSubject<LogisticsStatus[] | null> = new BehaviorSubject<LogisticsStatus[] | null>(null);
    currentLogisticsStatusObservable = this.logisticsStatusSource.asObservable();

    LOGISTIC_STATUS_NULL: string = null;
    LOGISTIC_STATUS_RECEIVED: string = "Order Received";
    LOGISTIC_STATUS_READY_FOR_COLLECTION: string = "Ready for Collection";
    LOGISTIC_STATUS_COLLECTED: string = "Collected";

    constructor(private httpClient: HttpClient) {
    }

    getLogisticStatuses() {
        this.httpClient.get<LogisticsStatus[]>(this.statusBaseUrl).subscribe(
            {
                next: response => {
                    this.logisticsStatusSource.next(response);
                    console.log(response);
                    this.logisticStatuses = response;
                }, error: err => {
                    console.log(err);
                }
            }
        )
    }

    getStatus(logisticsStatusId: string): LogisticsStatus {
        return this.logisticStatuses.find(item => item.id === logisticsStatusId);
    }
}
export enum OrderStatuses{
    packed="packed",

}