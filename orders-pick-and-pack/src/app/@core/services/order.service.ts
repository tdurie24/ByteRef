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
import {DistributionCompanyModel} from "../models/distribution.company.model";
import {OrderCollectionDto} from "../models/order.collection.dto";

@Injectable({
    providedIn: 'root',
})
export class LogisticsService {


    private currentLogisticsSource: BehaviorSubject<LogisticsModel[] | null> = new BehaviorSubject<LogisticsModel[] | null>(null);
    currentLogisticsObservable = this.currentLogisticsSource.asObservable();

    private currentSelectedLogisticModel: BehaviorSubject<LogisticsModel | null> = new BehaviorSubject<LogisticsModel | null>(null);
    currentSelectedOrderObservable = this.currentSelectedLogisticModel.asObservable();
    logisticsFromApi: LogisticsModel[] = [];
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
                this.logisticsFromApi = response;
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

    getLogisticModel(itemId: string) {
        let item: LogisticsModel | undefined = this.logisticsFromApi.find(item => item.id === itemId);
        return item;
    }


    addScannedItem(order: any, item: OrderItem) {
        //todo add the logic to add the scanned item into the items array of the selected order
    }

    getSelectedOrder(): LogisticsModel {
        let order: LogisticsModel = null;
        this.currentSelectedOrderObservable.subscribe({
            next: o => {
                order = o;
            }
        });
        return order;
    }

    updateCollectionDetails(collectionDto: OrderCollectionDto): void {
        let order: LogisticsModel = this.getSelectedOrder();
        order.distributionId = "";
        order.orderDistribution = null;
        order.collectionId = collectionDto.collectionBy;
        order.orderCollection = collectionDto;
        this.setSelectedOrder(order);
    }

    updateDeliveryDetails(distributionCompany: DistributionCompanyModel): void {
        let order: LogisticsModel = this.getSelectedOrder();
        order.collectionId = "";
        order.collectionId = null;
        order.distributionId = distributionCompany.distrubitionCompany;
        order.orderDistribution = distributionCompany;
        this.setSelectedOrder(order);

    }
}
