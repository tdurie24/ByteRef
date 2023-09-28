import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
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
import {OrderDetails, OrderResponse} from "../models/order.details.model";

@Injectable({
    providedIn: 'root',
})
export class LogisticsService {

    private currentLogisticsSource: BehaviorSubject<LogisticsModel[] | null> = new BehaviorSubject<LogisticsModel[] | null>(null);
    currentLogisticsObservable = this.currentLogisticsSource.asObservable();

    private currentSelectedLogisticModel: BehaviorSubject<OrderResponse | null> = new BehaviorSubject<LogisticsModel | null>(null);
    currentSelectedOrderObservable: Observable<OrderResponse> = this.currentSelectedLogisticModel.asObservable();

    private currentSelectedOrderItem: BehaviorSubject<OrderItem | null> = new BehaviorSubject<OrderItem | null>(null);
    currentSelectedOrderItemObservable: Observable<OrderItem> = this.currentSelectedOrderItem.asObservable();

    logisticsFromApi: LogisticsModel[] = [];
    logisticsBaseUrl: string = environment.api_logistics_base_url + "logistics/"

    constructor(private httpClient: HttpClient) {

    }

    setSelectedOrder(logisticModel: OrderResponse) {
        this.currentSelectedLogisticModel.next(logisticModel);
    }

    setSelectedOrderItem(item: OrderItem) {
        this.currentSelectedOrderItem.next(item);
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

    getOrderDetails(orderNumber: string): Observable<OrderResponse> {
         return this.httpClient.get<OrderResponse>(this.logisticsBaseUrl + `${orderNumber}`);
        //return this.httpClient.get<OrderResponse>(environment.api_logistics_base_url + `${orderNumber}`);
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

    getSelectedOrder(): OrderResponse {
        let order: OrderResponse = null;
        this.currentSelectedOrderObservable.subscribe({
            next: o => {
                order = o;
            }
        });
        return order;
    }

    updateCollectionDetails(collectionDto: OrderCollectionDto): void {
        let order: OrderResponse = this.getSelectedOrder();
        order.order.deliveryOption = "";
        order.orderDistribution = null;
        //order.collectionId = collectionDto.collectionBy;
        order.orderCollection = collectionDto;
        //this.setSelectedOrder(order);
    }

    updateDeliveryDetails(distributionCompany: DistributionCompanyModel): void {
        // let order: LogisticsModel = this.getSelectedOrder();
        // order.collectionId = "";
        // order.collectionId = null;
        // order.distributionId = distributionCompany.distrubitionCompany;
        // order.orderDistribution = distributionCompany;
        // this.setSelectedOrder(order);

    }

    updateOrderStatus(id: string, statusId: string) {
        return this.httpClient.put(environment.api_orders_base_url + "Orders/Update/Status", {id: id, status: status});
    }
}
