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
export class OrderService {


    private currentLogisticsSource: BehaviorSubject<LogisticsModel[] | null> = new BehaviorSubject<LogisticsModel[] | null>(null);
    currentLogisticsObservable = this.currentLogisticsSource.asObservable();

    private currentOrdersSource: BehaviorSubject<OrderModel[] | null> = new BehaviorSubject<OrderModel[] | null>(null);
    ordersObservable = this.currentOrdersSource.asObservable();

    private currentItemsSource: BehaviorSubject<OrderItem[] | null> = new BehaviorSubject<OrderItem[] | null>(null);
    itemsObservable = this.currentItemsSource.asObservable();

    private ordersFromApi: OrderModel[] = [];
    private itemsFromApi: OrderItem[] = [];
    private logisticsFromApi: LogisticsModel[] = [];

    currentSelectedLogisticModel: BehaviorSubject<LogisticsModel | null> = new BehaviorSubject<LogisticsModel | null>(null);
    currentSelectedOrderObservable = this.currentSelectedLogisticModel.asObservable();

    ordersBaseUrl: string = environment.apiUrl + "orders/"

    constructor(private httpClient: HttpClient) {
        this.ordersFromApi = this.makeOrders();
        this.itemsFromApi = this.makeItems();
        this.logisticsFromApi = this.makeLogistics();
    }
     updateTempData() {
        this.currentOrdersSource.next(this.ordersFromApi);
        this.currentItemsSource.next(this.itemsFromApi);
        this.currentLogisticsSource.next(this.logisticsFromApi);
    }

    setSelectedOrder(logisticModel: LogisticsModel) {
        this.currentSelectedLogisticModel.next(logisticModel);
    }

    getOrders() {
        this.httpClient.get<OrderModel[]>(this.ordersBaseUrl).subscribe({
            next: response => {
                this.currentOrdersSource.next(response);
            }, error: error => {
                //todo properly handle these errors and show a proper crash page
                console.log(error);
            }
        });
        this.currentOrdersSource.next(this.makeOrders());
    }

    updateOrder(order: OrderModel) {
        this.httpClient.put(this.ordersBaseUrl, order)
            .subscribe({
                next: response => {
                    const index = this.makeOrders().indexOf(order);
                    //todo uncomment here when there are proper orders from the API
                    //this.orders[index] = {...this.orders[index], ...order}
                    //for now use these orders
                    this.getOrders();
                    //this.ordersObservable.subscribe({next:orders})
                }
            });
    }

    deleteOrder(orderId: any) {

    }

    private makeLogistics(): LogisticsModel[] {
        return [
            {
                Id: "order101",
                UpdateBy: "dmpofu123",
                CreatedDate: new Date(),
                UpdateDate: new Date(),
                LogisticsStatusId: "1",
                DistributionId: "114536SamoraRoad",
                CollectionId: "string",
                Order: this.ordersFromApi[0],
                TotalItems: 233,
            }, {
                Id: "order102",
                UpdateBy: "tedd123",
                CreatedDate: new Date(),
                UpdateDate: new Date(),
                LogisticsStatusId: "2",
                DistributionId: "114536SamoraRoad",
                CollectionId: "string",
                Order: this.ordersFromApi[1],
                TotalItems: 23,
            },
        ];
    }

    private makeOrders(): OrderModel[] {
        return [
            {
                id: "testorder1",
                OrderNumber: 1,
                total: 2,
                LogisticsStatus: "string",
                AssignedTo: "string",
                DeliveryLocationId: 'string',
                FulfillmentLocationId: 'string',
                DeliveryLocationDto: null,
                FulfillmentLocationDto: null,
                OrderItems: this.makeItems(),
                totalItems: 129,
                dateModified: new Date(),
                orderDate: new Date(),
                dateCreated: new Date(),
            }, {
                id: "testorder1",
                OrderNumber: 1,
                total: 2,
                LogisticsStatus: "string",
                AssignedTo: "string",
                DeliveryLocationId: 'string',
                FulfillmentLocationId: 'string',
                DeliveryLocationDto: null,
                FulfillmentLocationDto: null,
                OrderItems: this.makeItems(),
                totalItems: 129,
                dateModified: new Date(),
                orderDate: new Date(),
                dateCreated: new Date(),
            }, {
                id: "testorder1",
                OrderNumber: 1,
                total: 2,
                LogisticsStatus: "string",
                AssignedTo: "string",
                DeliveryLocationId: 'string',
                FulfillmentLocationId: 'string',
                DeliveryLocationDto: null,
                FulfillmentLocationDto: null,
                OrderItems: this.makeItems(),
                totalItems: 129,
                dateModified: new Date(),
                orderDate: new Date(),
                dateCreated: new Date(),
            }
        ];
    }


    makeItems(): OrderItem[] {
        return [

            {
                lineItemId: 'string',
                fulfillableQuantity: 234,
                fulfillableService: 'string',
                fulfillableStatus: 'string',
                grams: 'string',
                productTitle: 'test product name',
                productPrice: 245,
                quantity: 12,
                requiresShipping: false,
                sku: 'string1',
                orderId: 'string1',
                id: 'string1',
            },
            {
                lineItemId: 'string',
                fulfillableQuantity: 234,
                fulfillableService: 'string',
                fulfillableStatus: 'string',
                grams: 'string',
                productTitle: 'test product name',
                productPrice: 245,
                quantity: 12,
                requiresShipping: false,
                sku: 'stri11ng',
                orderId: 'strin11g',
                id: 'string11',
            },
            {
                lineItemId: 'string',
                fulfillableQuantity: 234,
                fulfillableService: 'string',
                fulfillableStatus: 'string',
                grams: 'string',
                productTitle: 'test product name',
                productPrice: 245,
                quantity: 12,
                requiresShipping: false,
                sku: 'strin11g',
                orderId: 'st1111ring',
                id: 'stri1111ng',
            }
        ]
    }

    getItem(itemId: string) {
        let item: OrderItem | undefined = this.makeItems().find(item => item.id === itemId);
        return item;
    }


    addScannedItem(order: any, item: OrderItem) {
        //todo add the logic to add the scanned item into the items array of the selected order
    }
}
