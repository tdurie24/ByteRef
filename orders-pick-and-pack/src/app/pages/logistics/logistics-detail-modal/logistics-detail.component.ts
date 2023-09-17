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
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {ToastService} from "../../../@core/services/toast.service";

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

    // scan modal
    // @ViewChild('scanItemModal') scanItemModal: DialogComponent | any;
    // @ViewChild('container', {read: ElementRef, static: true}) container: ElementRef | any;


    // public targetElement?: HTMLElement;
    // isScanModalOpen: boolean = false;


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
    logisticsStatuses: LogisticsStatus[] = [];

    filter_scope = {
        created: "created",
        active: "active",
        inactive: "inactive",
        all_events: "all_logistics",
    };

    _scope = this.filter_scope.active;
    public logisticsModel: LogisticsModel;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private toasterService: NbToastrService,
                private nbDialogRef: NbDialogRef<LogisticsDetailComponent>,
                private logisticStatusService: LogisticsStatusService,
                private orderService: LogisticsService) {
        this.orderService.currentSelectedOrderObservable.subscribe(
            {
                next: logisticModel => {
                    this.logisticsModel = logisticModel;
                }
            }
        );
    }

    initializeForm() {
        this.logisticsDetailForm = this.formBuilder.group({
            OrderNumber: [{
                value: this.logisticsModel.Order.OrderNumber,
                disabled: !this.editMode
            }, [...this.formValidators]],

            Id: [{value: this.logisticsModel.Id, disabled: !this.editMode}, [...this.formValidators]],
            LogisticsStatusId: [{
                value: this.logisticsModel.LogisticsStatusId,
                disabled: !this.editMode
            }, [...this.formValidators]],

            DistributionId: [{
                value: this.logisticsModel.DistributionId,
                disabled: !this.editMode
            }, [...this.formValidators]],

            CollectionId: [{
                value: this.logisticsModel.CollectionId,
                disabled: !this.editMode
            }, [...this.formValidators]],

            UpdateBy: [{value: this.logisticsModel.UpdateBy, disabled: !this.editMode}, [...this.formValidators]],
            DateCreated: [{value: this.logisticsModel.CreatedDate, disabled: !this.editMode}, [...this.formValidators]],
            TotalItems: [{
                value: this.logisticsModel.Order.OrderItems.length,
                disabled: !this.editMode
            }, [...this.formValidators]],
            UpdateDate: [{value: this.logisticsModel.UpdateDate, disabled: !this.editMode}, [...this.formValidators]],

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
        if (this.logisticsDetailForm.valid) {
            this.orderService.updateLogistic(this.logisticsDetailForm.value);
        } else {
            this.toasterService.warning("You have some errors in your form","Form Not Complete");
        }

    }
}
