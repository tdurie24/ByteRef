import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

@Component({
    selector: 'logistics-detail-modal',
    templateUrl: './logistics-detail.component.html',
    styleUrls: ['./logistics-detail.component.scss']
})
export class LogisticsDetailComponent implements OnInit {
    // public logisticsDetailForm: FormGroup;

    private _destroy$: Subject<void> = new Subject<void>();
    editMode: boolean = false;

    formValidators = [Validators.required,];
    logisticsDetailForm: FormGroup = new FormGroup({});
    dialogTitle: string = "View";

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
    dropDownFields: Object = {text: 'name', value: 'id'}
    deliveryCompanyDropDownFields: Object = {text: 'distrubitionCompany', value: 'distributionReferenceNumber'}
    logisticsStatuses: LogisticsStatus[] = [];
    deliveryOptionDropDownData: DistributionCompanyModel[] = [];

    filter_scope = {
        created: "created",
        active: "active",
        inactive: "inactive",
        all_events: "all_logistics",
    };

    _scope = this.filter_scope.active;
    public logisticsModel: LogisticsModel;
    selectedDeliveryCompany: any = {};

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private dialog: NbDialogService,
                private nbDialogRef: NbDialogRef<LogisticsDetailComponent>,
                private logisticStatusService: LogisticsStatusService,
                private distributionService: DistributionCompaniesService,
                private orderService: LogisticsService) {

        this.orderService.currentSelectedOrderObservable.subscribe(
            {
                next: logisticModel => {
                    this.logisticsModel = logisticModel;
                }
            }
        );

        this.distributionService.distributionSourceObservable.subscribe(
            {
                next: data => {
                    this.deliveryOptionDropDownData = data;
                }
            });

    }


    initializeForm() {

        this.logisticsDetailForm = this.formBuilder.group({
            OrderNumber: [{
                value: this.logisticsModel?.orderNumber,
                disabled: !this.editMode
            }, [...this.formValidators]],

            Id: [{value: this.logisticsModel?.id, disabled: !this.editMode}, [...this.formValidators]],
            LogisticsStatusId: [{
                value: this.logisticsModel?.logisticsStatusId,
                disabled: !this.editMode
            }, [...this.formValidators]],

            DistributionId: [{
                value: this.logisticsModel?.distributionId,
                disabled: !this.editMode
            }, [...this.formValidators]],

            CollectionId: [{
                value: this.logisticsModel?.collectionId,
                disabled: !this.editMode
            }, [...this.formValidators]],

            UpdateBy: [{value: this.logisticsModel?.updateBy, disabled: !this.editMode}, [...this.formValidators]],
            DateCreated: [{
                value: this.logisticsModel?.createdDate,
                disabled: !this.editMode
            }, [...this.formValidators]],
            TotalItems: [{
                value: this.logisticsModel?.totalItems,
                disabled: !this.editMode
            }, [...this.formValidators]],
            UpdateDate: [{value: this.logisticsModel?.updateDate, disabled: !this.editMode}, [...this.formValidators]],

        });
    }


    initializeStatuses() {
        this.logisticStatusService.currentLogisticsStatusObservable.subscribe({
            next: r => {
                console.log(r);
                this.logisticsStatuses = r;
            }
        })
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

    ngOnInit(): void {
        this.initializeForm();
        this.initializeStatuses();

        this.toolbarOptions = [
            {text: "Search", tooltipTetxt: "Search", id: "filter"},
        ];

        this.setScope();
        this.filterSettings = {type: "Menu"};
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


    toolbarHandler(args: ClickEventArgs): void {
        switch (args.item.id) {
            case "add":
                break;
        }
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
        this.dialog.open(CollectionDetailsComponent);
    }
}
