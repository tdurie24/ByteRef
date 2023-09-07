import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "../_models/order";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ItemModel} from "../_models/item.model";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    private currentOrdersSource: BehaviorSubject<Order[] | null> = new BehaviorSubject<Order[] | null>(null);
    ordersObservable = this.currentOrdersSource.asObservable();

    private currentItemsSource: BehaviorSubject<ItemModel[] | null> = new BehaviorSubject<ItemModel[] | null>(null);
    itemsObservable = this.currentItemsSource.asObservable();

    private ordersFromApi: Order[] = [];
    private itemsFromApi: ItemModel[] = [];

    currentSelectedOrderSource: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);
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

    setSelectedOrder(order: Order) {
        this.currentSelectedOrderSource.next(order);
    }

    getOrders() {
        this.httpClient.get<Order[]>(this.ordersBaseUrl).subscribe({
            next: response => {
                this.currentOrdersSource.next(response);
            }, error: error => {
                //todo properly handle these errors and show a proper crash page
                console.log(error);
            }
        });
        this.currentOrdersSource.next(this.makeOrders());
    }

    updateOrder(order: Order) {
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

    private makeOrders(): Order[] {
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


    makeItems(): ItemModel[] {
        return [{
            itemId: '123132',
            name: "Intel i7 CPU",
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
            itemId: '123133',
            name: "Intel i3 CPU",
            partNumber: 'afw053100',
            price: 130,
            sku: 'ii7cpu-afw053410',
            description: 'some random text comes here'
        }]
    }

    getItem(itemId: string) {
        let item: ItemModel | undefined = this.makeItems().find(item => item.itemId === itemId);
        return item;
    }


}
