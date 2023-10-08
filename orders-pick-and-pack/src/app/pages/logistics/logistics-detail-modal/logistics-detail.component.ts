import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LogisticsService} from "../../../@core/services/order.service";
import {OrderModel} from "../../../@core/models/order.model";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";

import {LogisticsModel} from "../../../@core/models/logistics.model";

import {LogisticsStatus} from "../../../@core/models/logistics.status";
import {LogisticsStatusService} from "../../../@core/services/logistics.status.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {NbDialogRef, NbDialogService, NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../@core/services/toast.service";
import {DistributionCompanyModel} from "../../../@core/models/distribution.company.model";
import {DistributionCompaniesService} from "../../../@core/services/distribution.companies.service";
import {CollectionDetailsComponent} from "./collection-details/collection-details.component";
import {OrderResponse} from "../../../@core/models/order.details.model";
import {FullfilmentDetailsComponent} from "./fullfilment-details/fullfilment-details.component";
import {DeliveryDetailsComponent} from "./delivery-details/delivery-details.component";
import {DropDownListComponent} from "@syncfusion/ej2-angular-dropdowns";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'logistics-detail-modal',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.scss']
})
export class LogisticsDetailComponent implements OnInit {
    // public logisticsDetailForm: FormGroup;

    editMode: boolean = true;
    formValidators = [Validators.required,];
    logisticsDetailForm: FormGroup = new FormGroup({});
    dialogTitle: string = "View";
    selectedValue: string ='';


    toggleEdit() {

        this.editMode = !this.editMode;
        if (this.editMode) {
            this.dialogTitle = "Update";
            this.logisticsDetailForm.enable();
        } else {
            this.dialogTitle = "Update";
            this.logisticsDetailForm.disable();
        }
    }

    dropDownFields: Object = {text: 'statusDisplay', value: 'id'}
    deliveryCompanyDropDownFields: Object = {text: 'distrubitionCompany', value: 'distributionReferenceNumber'}
    logisticsStatuses: LogisticsStatus[] = [];
    deliveryOptionDropDownData: DistributionCompanyModel[] = [];


    public logisticsModel: OrderResponse;
    selectedDeliveryCompany: any = {};

    constructor(private formBuilder: FormBuilder,
                private dialog: NbDialogService,
                private toastService: NbToastrService,
                private nbDialogRef: NbDialogRef<LogisticsDetailComponent>,
                private logisticStatusService: LogisticsStatusService,
                private distributionService: DistributionCompaniesService,
                private datePipe: DatePipe,
                private orderService: LogisticsService) {


        this.distributionService.distributionSourceObservable.subscribe({
            next: data => {
                this.deliveryOptionDropDownData = data;
            }
        });

    }

    ngOnInit(): void {
        this.initEmptyForm();
        this.orderService.currentSelectedOrderObservable.subscribe({
                next: logisticModel => {
                    this.logisticsModel = logisticModel;
                    this.logisticsDetailForm.setValue({
                        logisticsStatusId: this.logisticsModel?.order?.orderStatus?.statusId

                    });

                    this.selectedValue = this.logisticsModel?.order.orderStatus?.description;

                }
            }
        );

        this.initializeForm();
        this.initializeStatuses();


    }

    initEmptyForm() {
        this.logisticsDetailForm = new FormGroup({
            'OrderNumber': new FormControl(null, [...this.formValidators]),
            'shippingTotal': new FormControl(null, [...this.formValidators]),
            'subTotal': new FormControl(null, [...this.formValidators]),
            'taxTotal': new FormControl(null, [...this.formValidators]),
            'deliveryTotal': new FormControl(null, [...this.formValidators]),
            'logisticsStatusId': new FormControl(null, [...this.formValidators]),
            'DistributionId': new FormControl(null, [...this.formValidators]),
            'CollectionId': new FormControl(null, [...this.formValidators]),
            'UpdateBy': new FormControl(null, [...this.formValidators]),
            'DateCreated': new FormControl(null, [...this.formValidators]),
            'TotalItems': new FormControl(null, [...this.formValidators]),
            'UpdateDate': new FormControl(null, [...this.formValidators]),
        });
    }

    initializeForm() {
// console.log(his.logisticsModel?.order?.orderStatus?.statusId)
        this.logisticsDetailForm = this.formBuilder.group({

            OrderNumber: [{
                value: this.logisticsModel?.order?.orderNumber,
                disabled: true
            }, [...this.formValidators]],


            shippingTotal: [{
                value: this.logisticsModel?.order?.shippingTotal,
                disabled: true
            }, [...this.formValidators]],

            subTotal: [{
                value: this.logisticsModel?.order?.subTotal,
                disabled: true
            }, [...this.formValidators]],


            taxTotal: [{
                value: this.logisticsModel?.order?.taxTotal,
                disabled: true
            }, [...this.formValidators]],

            deliveryTotal: [{
                value: this.logisticsModel?.order?.deliveryTotal,
                disabled: true
            }, [...this.formValidators]],

            logisticsStatusId: [{
                value: this.logisticsModel?.order?.orderStatus?.description,
                disabled: true
            }, [...this.formValidators]],

            DistributionId: [{
                value: this.logisticsModel?.order.deliveryOption,
                disabled: true
            }, [...this.formValidators]],

            CollectionId: [{
                value: this.logisticsModel?.order?.customer,
                disabled: true
            }, [...this.formValidators]],

            UpdateBy: [{
                value: this.logisticsModel?.updatedBy,
                disabled: true
            }, [...this.formValidators]],

            DateCreated: [{
                value: this.datePipe.transform(this.logisticsModel?.orderCreated, "dd/MM/yyyy h:m"),
                disabled: true
            }, [...this.formValidators]],

            TotalItems: [{
                value: this.logisticsModel?.order?.total,
                disabled: true
            }, [...this.formValidators]],

            UpdateDate: [{
                value: this.logisticsModel?.updatedDate,
                disabled: true
            }, [...this.formValidators]],


        });

        console.log(this.logisticsDetailForm.value);
        console.log(this.logisticsModel?.order?.orderStatus?.statusId);
    }

    initializeStatuses() {
        this.logisticStatusService.currentLogisticsStatusObservable.subscribe({
            next: r => {
                console.log(r);
                this.logisticsStatuses = r;
            }
        })
    }


    componentIsInvalid(control: string, formName: string): boolean {
        const forms = {
            'logisticsDetailForm': this.logisticsDetailForm
        }
        //return true;
        return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
    }


    updateOrderStatus(statusId: any) {
        this.orderService.updateOrderStatus(this.logisticsModel.id, statusId)
            .subscribe({
                next: res => {
                }, error: err => {
                    this.toastService.warning("Unable to update the order status please try again", "Update Failed");
                }
            });
    }


    closeModal() {
        this.nbDialogRef.close();
    }


    submitChanges() {
        //if (this.logisticsDetailForm.valid) {
        this.orderService.updateLogistic(this.logisticsDetailForm.value);
        // } else {
        //     this.toasterService.warning("You have some errors in your form","Form Not Complete");
        // }

    }

    addCollectionDetails() {
        if (this.editMode) {
            this.dialog.open(CollectionDetailsComponent, {
                closeOnEsc: false, closeOnBackdropClick: false,
            }).onClose.subscribe({
                next: value => {
                    if (value) {

                        this.initializeForm();
                        //this.initializeStatuses();
                    }
                }
            })
        }

    }

    protected readonly JSON = JSON;

    editFulfilemt() {
        if (this.editMode) {
            this.dialog.open(FullfilmentDetailsComponent);
        }
    }

    editDeliveryLocation() {
        if (this.editMode) {
            this.dialog.open(DeliveryDetailsComponent);
        }
    }

    isMaxed: boolean = true;
    @ViewChild("parentModal") parentModal;

    minimizeModal() {
        console.log(`minimize ${this.isMaxed}`)
        this.isMaxed = !this.isMaxed;
    }
}
