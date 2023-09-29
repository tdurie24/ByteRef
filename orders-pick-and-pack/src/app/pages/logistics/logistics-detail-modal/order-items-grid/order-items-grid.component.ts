import {Component, Input, OnInit} from '@angular/core';

import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {LogisticsDetailComponent} from "../logistics-detail.component";
import {MenuEventArgs} from "@syncfusion/ej2-angular-splitbuttons";
import {DatePipe} from "@angular/common";
import {LogisticsService} from "../../../../@core/services/order.service";
import {NbDialogService} from "@nebular/theme";
import {OrderItem} from "../../../../@core/models/order.item";
import {OrderItemDetailsComponent} from "../order-item-details/order-item-details.component";

@Component({
    selector: 'order-items-grid',
    templateUrl: './order-items-grid.component.html',
    styleUrls: ['./order-items-grid.component.scss']
})
export class OrderItemsGridComponent implements OnInit {

    @Input('orderItems') orderItems: OrderItem[] = [];
    gridData: any[] = [];
    filter_scope = {
        created: "created",
        active: "active",
        inactive: "inactive",
        all_events: "all_logistics",
    };

    _scope = this.filter_scope.active;


    toolbarOptions: object;
    filterSettings: Object;
    pageSettings: Object = {pageSizes: true, pageSize: 10, currentPage: 1};

    sortOptions = {
        columns: [
            {field: 'lineItemId', direction: 'Descending'},
        ]
    };

    wrapSettings = {wrapMode: 'Content'};
    listOfEventOptions = {

        edit: {
            text: 'View/Edit',
            id: 'edit',
        },
        // add: {
        //     text: 'Replace',
        //     id: 'Replace',
        // },
        // remove: {
        //     text: 'Remove',
        //     id: 'Remove',
        // },

    };
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute,
                private datePipe: DatePipe,
                private dialogService: NbDialogService,
                private orderService: LogisticsService,) {
    }

    ngOnInit(): void {
        this.initPage();
    }

    initPage() {
        this.prepareItems();
        this.initializeGrid();
    }

    public onOpenItemDetailsDialog(order: any): void {
        let orderItem = this.orderItems?.find(item => item?.sku === order?.sku);
        this.orderService.setSelectedOrder(orderItem);
        this.dialogService.open(OrderItemDetailsComponent, {
            closeOnEsc: false,
            closeOnBackdropClick: false,
            hasBackdrop: true,
            context: {}
        }).onClose.subscribe({
            next: r => {
                if (r) {
                    console.log("dialog closed");
                    this.initPage();
                }
            }
        });

    }

    eventOptionsHandler(args: MenuEventArgs, data: any) {
        console.log(data);
        if (args.item.id === "edit") {

            if (data) {
                this.onOpenItemDetailsDialog(data);
            }
        }
    }

    initializeGrid() {

        this.toolbarOptions = [
            {text: "Search", tooltipTetxt: "Search", id: "filter"},
        ];
        this.filterSettings = {type: "Menu"};

        this.route.queryParams
            .pipe(takeUntil(this._destroy$))
            .subscribe((param: { event_filter: String }) => {
                if (param.event_filter) {
                    switch (param.event_filter) {
                        case this.filter_scope.active:
                            this._scope = this.filter_scope.active;
                            // get active jobs
                            break;
                        default:
                            this._scope = this.filter_scope.active;
                            // get active jobs
                            break;
                    }
                }
            });
    }


    prepareItems() {
        for (const order of this.orderItems) {
            console.log(order);
            if (order.isPacked !== null) {
                order.isPacked = "No";
            } else if (order.isPacked === false) {
                order.isPacked = "No";
            } else {
                order.isPacked = "Yes";
            }
            this.gridData.push(order);
        }
    }

    toolbarHandler(event: any) {

    }
}
