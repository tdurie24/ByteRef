import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from "../../../_services/order.service";
import {Order} from "../../../_models/order";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";

@Component({
    selector: 'logistics-detail',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.scss']
})
export class LogisticsDetailComponent implements OnInit {
    // public logisticsDetailForm: FormGroup;
    public selectedOrder: Order | undefined;
    formValidators = [Validators.required];
    logisticsDetailForm: FormGroup = new FormGroup({});

    // scan modal
    @ViewChild('scanItemModal') scanItemModal: DialogComponent | any;
    @ViewChild('container', {read: ElementRef, static: true}) container: ElementRef | any;
    public targetElement?: HTMLElement;
    isScanModalOpen: boolean = false;


    toolbarOptions: object;
    filterSettings: Object;
    pageSettings: Object = {pageSizes: true, pageSize: 10, currentPage: 1};

    sortOptions = {columns: [{field: 'dateFrom', direction: 'Descending'}]};

    wrapSettings = {wrapMode: 'Content'};
    listOfEventOptions = {
            details: {
                text: 'Details',
                id: 'Details',
            },
            edit: {
                text: 'Edit',
                id: 'Edit',
            },
            add: {
                text: 'Replace',
                id: 'Replace',
            },
            remove: {
                text: 'Remove',
                id: 'Remove',
            },

        };

    constructor(private formBuilder: FormBuilder,
                private orderService: OrderService) {}

    initializeForm() {
        this.logisticsDetailForm = this.formBuilder.group({
            OrderNumber: [this.selectedOrder.OrderNumber, [...this.formValidators]],
            LogisticsStatus: [this.selectedOrder.LogisticsStatus, [...this.formValidators]],
            AssignedTo: [this.selectedOrder.AssignedTo, [...this.formValidators]],
            TotalItems: [this.selectedOrder.TotalItems, [...this.formValidators]],
            DateUpdated: [this.selectedOrder.DateUpdated, [...this.formValidators]],
            DateCreated: [this.selectedOrder.DateCreated, [...this.formValidators]],
        });
    }

    ngOnInit(): void {
        this.orderService.currentSelectedOrderObservable.subscribe({
            next: order => {
                this.selectedOrder = order;
            }
        });
        this.initializeForm();
    }

    showScanModal(){
        this.scanItemModal = true;
        this.scanItemModal.show();
    }

    hideScanModal(){
        this.scanItemModal = false;
        this.scanItemModal.hide();
    }

    componentIsInvalid(control: string, formName: string): boolean {
        const forms = {
            'logisticsDetailForm': this.logisticsDetailForm
        }
        return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
    }

    eventOptionsHandler($event: any, data: any) {

    }


}
