import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderCollectionDto} from "../../../../@core/models/order.collection.dto";
import {LogisticsService} from "../../../../@core/services/order.service";
import {NbDialogRef} from "@nebular/theme";

@Component({
    selector: 'collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

    collectionDetails: any = {};
    formValidators = [Validators.required,];
    collectionDetailForm: FormGroup = new FormGroup({});

    constructor(private orderService: LogisticsService,
                private dialogRef: NbDialogRef<CollectionDetailsComponent>,
                private formBuilder: FormBuilder,) {

        this.orderService.currentSelectedOrderObservable.subscribe({
            next: logisticModel => {
                this.collectionDetails = logisticModel.orderCollection;
            }
        });
    }

    initForm() {

        this.collectionDetailForm = this.formBuilder.group({
            collectionBy: [{
                value: "this.collectionDetails?.collectionBy",
            }, [...this.formValidators]],

            collectionDate: [{
                value: "this.collectionDetails?.collectionDate",
            }, [...this.formValidators]],

            updatedBy: [{
                value: "Logged In User",
            }, [...this.formValidators]],

        });
    }

    ngOnInit(): void {


        this.initForm();
    }

    componentIsInvalid(control: string, formName: string): boolean {
        const forms = {
            'collectionDetailsForm': this.collectionDetailForm
        }
        return false;
        // return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
    }

    submitChanges() {

    }

    close() {
        this.dialogRef.close();
    }
}
