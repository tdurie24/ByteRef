import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderModel} from "../models/order.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OrderItem} from "../models/order.item";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    private currentOrdersSource: BehaviorSubject<OrderModel[] | null> = new BehaviorSubject<OrderModel[] | null>(null);
    ordersObservable = this.currentOrdersSource.asObservable();

    private currentItemsSource: BehaviorSubject<OrderItem[] | null> = new BehaviorSubject<OrderItem[] | null>(null);
    itemsObservable = this.currentItemsSource.asObservable();

    private ordersFromApi: OrderModel[] = [];
    private itemsFromApi: OrderItem[] = [];

    currentSelectedOrderSource: BehaviorSubject<OrderModel | null> = new BehaviorSubject<OrderModel | null>(null);
    currentSelectedOrderObservable = this.currentSelectedOrderSource.asObservable();

    ordersBaseUrl: string = environment.apiUrl + "orders/"

    constructor(private httpClient: HttpClient) {
        this.ordersFromApi = this.makeOrders();
        this.itemsFromApi = this.makeItems();

    }

    private updateOrdersAndItems(){
        this.currentOrdersSource.next(this.ordersFromApi);
        this.currentItemsSource.next(this.itemsFromApi);
    }

    setSelectedOrder(order: OrderModel) {
        this.currentSelectedOrderSource.next(order);
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

    private makeOrders(): OrderModel[] {
        return [
            {
                OrderNumber: 10248,
                LogisticsStatus: 'Received',
                AssignedTo: 'Teddy',
                TotalItems: 3,
                DateUpdated: new Date(),
                DateCreated: new Date(),
                Items: this.makeItems(),
            }, {
                OrderNumber: 10249,
                LogisticsStatus: 'Received',
                AssignedTo: 'Daniel',
                TotalItems: 3,
                DateUpdated: new Date(),
                DateCreated: new Date(),
                Items: this.makeItems(),
            }, {
                OrderNumber: 10250,
                LogisticsStatus: 'Received',
                AssignedTo: 'Liam',
                TotalItems: 3,
                DateUpdated: new Date(),
                DateCreated: new Date(),
                Items: this.makeItems(),
            }, {
                OrderNumber: 10251,
                LogisticsStatus: 'Received',
                AssignedTo: 'Jack',
                TotalItems: 3,
                DateUpdated: new Date(),
                DateCreated: new Date(),
                Items: this.makeItems(),
            }
        ];
    }


    makeItems(): OrderItem[] {
        return [{
            productTitle: '123132',
            pr: "Intel i7 CPU",
            partNumber: 'afw053100',
            price: 230,
            sku: 'ii7cpu-wafw053s10',
            description: 'some random text comes here'
        }, {
            itemId: '123133',
            name: "Intel i5 CPU",
            partNumber: 'afw053100',
            price: 130,
            sku: 'ii7cpu-afw053410s',
            description: 'some random text comes here'
        }, {
            id: '123133',
            productTitle: "Intel i3 CPU",
            partNumber: 'afw053100',
            price: 130,
            sku: 'ii7cpu-afw053410',
            description: 'some random text comes here'
        }]
    }

    getItem(itemId: string) {
        let item: OrderItem | undefined = this.makeItems().find(item => item.id === itemId);
        return item;
    }


    addScannedItem(order: any, item: OrderItem) {
        //todo add the logic to add the scanned item into the items array of the selected order
    }
}
