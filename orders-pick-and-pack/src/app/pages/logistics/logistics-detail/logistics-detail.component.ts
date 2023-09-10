import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from "../../../@core/services/order.service";
import {OrderModel} from "../../../@core/models/order.model";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {LogisticsModel} from "../../../@core/models/logistics.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'logistics-detail',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.scss']
})
export class LogisticsDetailComponent implements OnInit {
    // public logisticsDetailForm: FormGroup;

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
                @Inject(MAT_DIALOG_DATA) public selectedOrder: LogisticsModel,
                private dialogRef: MatDialogRef<LogisticsDetailComponent>,
                private orderService: OrderService) {
    }

    initializeForm() {

        this.logisticsDetailForm = this.formBuilder.group({
            OrderNumber: [this.selectedOrder.Order.orderNumber, [...this.formValidators]],
            Id: [this.selectedOrder.Id, [...this.formValidators]],

            LogisticsStatusId: [this.selectedOrder.LogisticsStatusId, [...this.formValidators]],
            DistributionId: [this.selectedOrder.DistributionId, [...this.formValidators]],
            CollectionId: [this.selectedOrder.CollectionId, [...this.formValidators]],
            UpdateBy: [this.selectedOrder.UpdateBy, [...this.formValidators]],
            DateCreated: [this.selectedOrder.CreatedDate, [...this.formValidators]],
            TotalItems: [this.selectedOrder.CreatedDate, [...this.formValidators]],
            UpdateDate: [this.selectedOrder.UpdateDate, [...this.formValidators]],
        });
    }


    closeDialog() {
        this.dialogRef.close();
    }


    ngOnInit(): void {
        this.initializeForm();
        console.log(this.selectedOrder)
    }


    componentIsInvalid(control: string, formName: string): boolean {
        const forms = {
            'logisticsDetailForm': this.logisticsDetailForm
        }
        //return true;
        return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
    }

    eventOptionsHandler($event: any, data: any) {

    }


}
