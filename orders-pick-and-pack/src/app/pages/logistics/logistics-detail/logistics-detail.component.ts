import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from "../../../_services/order.service";
import {Order} from "../../../_models/order";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";

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
    toolbarOptions: object;
    filterSettings: Object;
    pageSettings: Object = {pageSizes: true, pageSize: 10, currentPage: 1};

    sortOptions = {columns: [{field: 'dateFrom', direction: 'Descending'}]};

    wrapSettings = {wrapMode: 'Content'};
    listOfEventOptions =
        {
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

        }
    ;

    constructor(private formBuilder: FormBuilder,
                private orderService: OrderService) {

    }

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
        })
        this.initializeForm();
    }

    // createForm() {
    //   this.logisticsDetailForm = this.formBuilder.group({
    //     title: ['',[Validators.required]],
    //     jobReference: ['',[Validators.required]],
    //     availablePositions: ['',[Validators.required]],
    //     department: ['',[Validators.required]],
    //     costCentre: ['',[Validators.required]],
    //     payGrade: ['',[Validators.required]],
    //     salaryType: ['',[Validators.required]],
    //     minSalary: ['',[Validators.required]],
    //     maxSalary: ['',[Validators.required]],
    //     positionType: ['',[Validators.required]],
    //     duraton: ['',[Validators.required]],
    //     country: ['',[Validators.required]],
    //     province: ['',[Validators.required]],
    //     city: ['',[Validators.required]],
    //     synopsis: ['',[Validators.required]],
    //     description: ['',[Validators.required]],
    //     requirements: ['',[Validators.required]],
    //     workLevel: ['',[Validators.required]],
    //     category: ['',[Validators.required]],
    //     anticipatedStartDate: ''
    //   });
    // }


    componentIsInvalid(control: string, formName: string): boolean {
        const forms = {
            'logisticsDetailForm': this.logisticsDetailForm
        }

        // console.log(control)
        // console.log(formName)
        // console.log(forms[formName].get(control))
        return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
    }

    eventOptionsHandler($event: any, data: any) {

    }

    toolbarHandler(args: ClickEventArgs): void {
        switch (args.item.id) {
            case "add":
                // this.event_action = this.eventActions.create;
                // this.openWindow(this.editEvent, 'Create Event');
                break;
        }
    }

    openWindow(viewEvent: any, eventName: any, data: any) {

    }
}
