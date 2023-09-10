import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {LogisticsModel} from "../models/logistics.model";
import {environment} from "../../../environments/environment";
import {LogisticsStatus} from "../models/logistics.status";

@Injectable({
    providedIn: 'root'
})
export class LogisticsStatusService {

    private statusBaseUrl = environment.apiUrl + "LogisticsStatuses";

    private logisticsStatusSource: BehaviorSubject<LogisticsStatus[] | null> = new BehaviorSubject<LogisticsStatus[] | null>(null);
    currentLogisticsStatusObservable = this.logisticsStatusSource.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    getLogisticStatuses() {
        this.makeTestStatuses();
        this.logisticsStatusSource.next(this.makeTestStatuses());
        this.httpClient.get<LogisticsStatus[]>(this.statusBaseUrl).subscribe(
            {
                next: response => {
                    this.logisticsStatusSource.next(response);
                }
            }
        )
    }

    private makeTestStatuses(): LogisticsStatus[] {
        return [
            {id: "1", name: "Order Status 1"},
            {id: "2", name: "Order status 2"},
            {id: "3", name: "Order status 3"},
            {id: "4", name: "order status 4"},
        ]
    }

}
