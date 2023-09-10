import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {NbDialogService, NbWindowRef, NbWindowService} from "@nebular/theme";
import {ToastService} from "app/@core/services/toast.service";
import {GridComponent} from "@syncfusion/ej2-angular-grids";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {handleError} from "app/@core/shared/handleServiceError";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {MenuEventArgs} from "@syncfusion/ej2-angular-splitbuttons";
import {OrderService} from "../../@core/services/order.service";
import {OrderModel} from "../../@core/models/order.model";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";

import {EmitType} from '@syncfusion/ej2-base';
import {LogisticsModel} from "../../@core/models/logistics.model";
import {MatDialog} from "@angular/material/dialog";
import {LogisticsDetailComponent} from "./logistics-detail/logistics-detail.component";

@Component({
    selector: 'logistics',
    templateUrl: "./logistics.component.html",
    styleUrls: ["./logistics.component.scss"],
})
export class LogisticsComponent implements OnInit, OnDestroy {
    @ViewChild("edit") editEvent: TemplateRef<any>;
    @ViewChild("view") viewEvent: TemplateRef<any>;

    // @ViewChild("attendeeView") attendeeView: TemplateRef<any>;
    @ViewChild("confirmationDialog") confirmationDialog: TemplateRef<any>;
    @ViewChild("eventGrid") eventGrid: GridComponent;


    //@ViewChild('editOrderDialog') editOrderDialog: DialogComponent;
    //@ViewChild('container', {read: ElementRef, static: true}) container: ElementRef | any;
    // public targetElement?: HTMLElement;
    //editModalOpen: boolean = false;

    public data: LogisticsModel[];

    protected windowRef: NbWindowRef;

    // grid settings
    toolbarOptions: object;
    filterSettings: Object;

    pageSettings: Object = {pageSizes: true, pageSize: 10, currentPage: 1};
    wrapSettings = {wrapMode: 'Content'};
    private _destroy$: Subject<void> = new Subject<void>();

    private eventActions = {create: "create", update: "update"};
    event_action = this.eventActions.create;

    private attendeeActions = {add: "add", remove: "remove"};
    filter_scope = {
        created: "created",
        active: "active",
        inactive: "inactive",
        all_events: "all_logistics",
    };

    _scope = this.filter_scope.active;

    listOfEventOptions =
        {
            edit: {
                text: 'Edit',
                id: 'Edit',
            },
            view: {
                text: 'View',
                id: 'View',
            },
            cancel: {
                text: 'Cancel',
                id: 'Delete',
            },
            scan: {
                text: 'Scan',
                id: 'Scan',
            },
            add: {
                text: 'Add',
                id: 'Add',
            },
            remove: {
                text: 'Remove',
                id: 'Remove',
            },
            qr: {
                text: 'QR',
                id: 'QR',
            },
            delete: {
                text: 'Delete',
                id: 'Delete',
            }
        };

    sortOptions = {columns: [{field: 'dateFrom', direction: 'Descending'}]};

    constructor(
        private toastService: ToastService,
        private windowService: NbWindowService,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private dialog: MatDialog
    ) {
    }

    public ngOnInit(): void {

        this.toolbarOptions = [
            {text: "Search", tooltipTetxt: "Search", id: "filter"},
        ];
        this.orderService.currentLogisticsObservable.subscribe({
            next: logistics => {
                this.data = logistics;
            }
        });
        this.setScope();
        this.filterSettings = {type: "Menu"};
        // this.editOrderDialog.hide();
        // if(this.editOrderDialog){}
        // this.initilaizeTarget();

    }


    public onOpenEditLogisticDialog(order: any): void {
        //this.orderService.setSelectedOrder(order);
        console.log(order);
        this.dialog.open(LogisticsDetailComponent, {width: '80%', data: order});


    }

    setScope() {
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

    openEventUpdateView(object: any) {
        this.event_action = this.eventActions.update;
        this.openWindow(this.editEvent, 'Update', object);
    }

    openWindow(modalRef: TemplateRef<any>, viewTitle: string, data?) {
        const btnConfig = {
            minimize: false,
            maximize: false,
            fullScreen: false,
            close: true,
        };

        this.windowRef = this.windowService.open(
            modalRef,
            {
                title: viewTitle,
                closeOnEsc: false,
                context: data,
                windowClass: 'windowfull-screen',
            },
        );
    }

    toolbarHandler(args: ClickEventArgs): void {
        switch (args.item.id) {
            case "add":
                this.event_action = this.eventActions.create;
                this.openWindow(this.editEvent, 'Create Event');
                break;
        }
    }

    eventActionHandler(eventUpdate: any) {

        let endpoint = "";
        let errMsg = '';
        let successMsg = '';
        if (this.event_action === this.eventActions.create) {
            endpoint = "AddEvent";
            successMsg = "Successfully Created Event";
            errMsg = "Error Creating Event";
        }

        if (this.event_action === this.eventActions.update) {
            endpoint = "UpdateEvent";
            successMsg = "Successfully Updated Event";
            errMsg = "Error Updating Event";
        }
    }

    eventOptionsHandler(args: MenuEventArgs, data: any) {

        if (args.item.id === "Edit") {

            if (data) {
                this.onOpenEditLogisticDialog(data);
            }
        }
        if (args.item.id === "View") {
            this.openWindow(this.viewEvent, data.eventName, data);
        }
        // if (args.item.id === "AddAttendees") {
        //  this.openAttendeeView(data, this.attendeeActions.add)
// }
        // if (args.item.id === "RemoveAttendees") {
        //   this.openAttendeeView(data, this.attendeeActions.remove)
        // }
        if (args.item.id === "DeleteEvent") {
            this.openWindow(this.confirmationDialog, 'Delete Event', data);
        }
    }

    handleScanButton() {

    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    deleteEvent(data: any) {
        this.event_action = this.eventActions.update;
        data.isActive = false;
        if (!data.isActive) {
            this.eventActionHandler(data);
        }
    }

    close() {
        this.windowRef.close();
    }
}
