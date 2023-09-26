import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderCollectionDto} from "../../../../@core/models/order.collection.dto";
import {LogisticsService} from "../../../../@core/services/order.service";
import {NbDialogRef} from "@nebular/theme";
import {DistributionCompaniesService} from "../../../../@core/services/distribution.companies.service";
import {DistributionCompanyModel} from "../../../../@core/models/distribution.company.model";


@Component({
    selector: 'collection-details',
    templateUrl: './collection-details.component.html',
    styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

    isCollection: boolean = false;
    collectionDetails: any = {};
    selectedDeliveryCompany: any = '';
    //collectionDetailForm: FormGroup = new FormGroup({});
    deliveryCompanies: DistributionCompanyModel[] = [];
    deliveryCompanyDropDownFields: Object = {text: 'distrubitionCompany', value: 'distributionReferenceNumber'}
    collectedBy: string = '';
    collectionDate: string = '';
    updatedBy: string = "Logged In user";

    constructor(private orderService: LogisticsService,
                private dialogRef: NbDialogRef<CollectionDetailsComponent>,
                private deliveryService: DistributionCompaniesService) {
    }

    ngOnInit(): void {

        this.orderService.currentSelectedOrderObservable.subscribe({
            next: logisticModel => {
                this.collectionDetails = logisticModel.orderCollection;
            }
        });

        this.deliveryService.distributionSourceObservable.subscribe({
            next: value => {
                this.deliveryCompanies = value;
            }
        })
    }

    componentIsInvalid(control: string, formName: string): boolean {
        const forms = {
            //'collectionDetailsForm': this.collectionDetailForm
        }
        return false;
        // return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
    }

    submitChanges() {
        //todo install jwt_decode and finish up the method to get the username from the token
        //use that value to fill up the

        if (this.isCollection) {
            let orderCollectionDto: OrderCollectionDto = {
                updatedBy: 'logged in user',
                updatedDate: this.collectionDate,
                collectionBy:this.collectedBy ,
                collectionDate: new Date().toDateString(),
                createdDate: new Date().toDateString()
            };
            this.orderService.updateCollectionDetails(orderCollectionDto);
        } else {
            let deliveryCompany: DistributionCompanyModel
                = this.deliveryCompanies.find(d => d.distributionReferenceNumber == this.selectedDeliveryCompany)

            if (deliveryCompany !== null) {
                this.orderService.updateDeliveryDetails(deliveryCompany);
            }

        }
        this.dialogRef.close();

    }

    close() {
        this.dialogRef.close();
    }

    collectionTypeChanged(name: string) {
        if (name === 'collection') {
            this.isCollection = true;
        } else {
            this.isCollection = false;
        }
    }

    setSelectedCompany(event: any) {
        console.log(event);
        // this.selectedDeliveryCompany = {};
    }
}
