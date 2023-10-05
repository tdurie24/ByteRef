import {Component, OnInit} from '@angular/core';
import {LogisticsService} from "../../../../@core/services/order.service";
import {OrderItem} from "../../../../@core/models/order.item";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NbDialogRef} from "@nebular/theme";

@Component({
    selector: 'order-item-details',
    templateUrl: './order-item-details.component.html',
    styleUrls: ['./order-item-details.component.scss']
})
export class OrderItemDetailsComponent implements OnInit {

    selectedOrderItem: OrderItem;
    orderItemsDetailsForm: FormGroup = new FormGroup({});
    formValidators = [Validators.required,];

    constructor(private orderService: LogisticsService,
                private formBuilder: FormBuilder,
                private dialogRef: NbDialogRef<OrderItemDetailsComponent>) {
        this.orderService.currentSelectedOrderItemObservable.subscribe({
            next: value => {
                this.selectedOrderItem = value;
                console.log(this.selectedOrderItem);
            }
        });
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.orderItemsDetailsForm = this.formBuilder.group({
            lineItemId: [{value: this.selectedOrderItem?.lineItemId, disabled: true}, [...this.formValidators]],
            fulfillableQuantity: [{value: this.selectedOrderItem?.fulfillableQuantity, disabled: true}, [...this.formValidators]],
            fulfillableService: [{value: this.selectedOrderItem?.fulfillableService, disabled: true}, [...this.formValidators]],
            fulfillableStatus: [{value: this.selectedOrderItem?.fulfillableStatus, disabled: true}, [...this.formValidators]],
            grams: [{value: this.selectedOrderItem?.grams, disabled: true}, [...this.formValidators]],
            productTitle: [{value: this.selectedOrderItem?.productTitle, disabled: true}, [...this.formValidators]],
            productPrice: [{value: this.selectedOrderItem?.productPrice, disabled: true}, [...this.formValidators]],
            quantity: [{value: this.selectedOrderItem?.quantity, disabled: true}, [...this.formValidators]],
            requiresShipping: [{value: this.selectedOrderItem?.requiresShipping, disabled: true}, [...this.formValidators]],
            sku: [{value: this.selectedOrderItem?.sku, disabled: true}, [...this.formValidators]],
            orderId: [{value: this.selectedOrderItem?.orderId, disabled: true}, [...this.formValidators]],
            isPacked: [{value: this.selectedOrderItem?.isPacked, disabled: true}, [...this.formValidators]],
        });
    }

    submitChanges() {

    }

    closeModal() {
        this.dialogRef.close(true);
    }
}
