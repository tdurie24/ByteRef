import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
    selector: 'delivery-details',
    templateUrl: './delivery-details.component.html',
    styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

    constructor(
        private dialogRef: NbDialogRef<DeliveryDetailsComponent>
    ) {
    }

    ngOnInit(): void {
    }

    submitChanges() {

    }

    closeModal() {
        this.dialogRef.close();
    }
}
