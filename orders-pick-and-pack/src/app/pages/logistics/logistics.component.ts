import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {NbDialogService, NbWindowRef, NbWindowService} from "@nebular/theme";
import {ToastService} from "app/@core/services/toast.service";
import {GridComponent} from "@syncfusion/ej2-angular-grids";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {handleError} from "app/@core/shared/handleServiceError";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {MenuEventArgs} from "@syncfusion/ej2-angular-splitbuttons";
import {LogisticsService} from "../../@core/services/order.service";
import {OrderModel} from "../../@core/models/order.model";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";

import {EmitType} from '@syncfusion/ej2-base';
import {LogisticsListingDTO, LogisticsModel} from "../../@core/models/logistics.model";

import {LogisticsDetailComponent} from "./logistics-detail-modal/logistics-detail.component";
import {LogisticsStatusService} from "../../@core/services/logistics.status.service";
import {DistributionCompaniesService} from "../../@core/services/distribution.companies.service";

@Component({
    selector: 'logistics',
    templateUrl: "./logistics.component.html",
    styleUrls: ["./logistics.component.scss"],
})
export class LogisticsComponent implements OnInit {
    @ViewChild("edit") editEvent: TemplateRef<any>;
    @ViewChild("view") viewEvent: TemplateRef<any>;
    @ViewChild("confirmationDialog") confirmationDialog: TemplateRef<any>;
    @ViewChild("eventGrid") logisticsTable: GridComponent;


    constructor(
        private orderService: LogisticsService,
        private logisticStatusService: LogisticsStatusService,
    ) {
    }

    newOrders: LogisticsListingDTO[] = [];
    allOrders: LogisticsListingDTO[] = [];
    processingOrders: LogisticsListingDTO[] = [];
    readyForCollection: LogisticsListingDTO[] = [];
    collectedOrders: LogisticsListingDTO[] = [];

    public ngOnInit(): void {


        this.orderService.currentLogisticsObservable.subscribe({
            next: logistics => {

                for (let logistic of logistics) {

                    let logisticsListingDTO: LogisticsListingDTO = {
                        Id: logistic?.id,
                        UpdateBy: logistic?.updateBy,
                        CreatedDate: logistic?.createdDate,
                        UpdateDate: logistic?.updateDate,
                        LogisticsStatus: logistic?.logisticStatus?.name,
                        DistributionCompany: logistic?.orderDistribution?.distrubitionCompany,
                        CollectionId: logistic?.collectionId,
                        OrderNumber: logistic?.orderNumber,
                        TotalItems: logistic?.orderCollection?.length,
                    };
                    this.allOrders.push(logisticsListingDTO);

                    //new orders
                    if (logisticsListingDTO?.LogisticsStatus === this.logisticStatusService?.LOGISTIC_STATUS_NULL || logisticsListingDTO?.LogisticsStatus === this.logisticStatusService?.LOGISTIC_STATUS_RECEIVED) {
                        this.newOrders.push(logisticsListingDTO);
                    }
                    //collected
                    else if (logisticsListingDTO?.LogisticsStatus === this.logisticStatusService?.LOGISTIC_STATUS_COLLECTED) {
                        this.collectedOrders.push(logisticsListingDTO);
                    }
                    //ready for collection.
                    else if (logisticsListingDTO?.LogisticsStatus === this.logisticStatusService?.LOGISTIC_STATUS_READY_FOR_COLLECTION) {
                        this.readyForCollection.push(logisticsListingDTO);
                    }

                    //processing logistics
                    else if(logisticsListingDTO?.LogisticsStatus !== this.logisticStatusService?.LOGISTIC_STATUS_NULL || logisticsListingDTO?.LogisticsStatus !== this.logisticStatusService?.LOGISTIC_STATUS_RECEIVED) {
                        this.processingOrders.push(logisticsListingDTO);
                    }

                }

            }
        });

    }

}
