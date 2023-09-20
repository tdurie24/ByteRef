import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";
import {LogisticsStatus} from "../models/logistics.status";

@Injectable({
    providedIn: 'root'
})
export class LogisticsStatusService {

    private statusBaseUrl = environment.apiUrl + "LogisticsStatuses";
    private logisticStatuses: LogisticsStatus[] = [];
    private logisticsStatusSource: BehaviorSubject<LogisticsStatus[] | null> = new BehaviorSubject<LogisticsStatus[] | null>(null);
    currentLogisticsStatusObservable = this.logisticsStatusSource.asObservable();

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
