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
import {DatePipe} from "@angular/common";
import {LogisticStatuses} from "../../@core/enums/logistic.statuses";

@Component({
    selector: 'logistics',
    templateUrl: "./logistics.component.html",
    styleUrls: ["./logistics.component.scss"],
})
export class LogisticsComponent implements OnInit {

    readyForPackaging: LogisticsListingDTO[] = [];
    allOrders: LogisticsListingDTO[] = [];
    processingOrders: LogisticsListingDTO[] = [];
    readyForCollection: LogisticsListingDTO[] = [];
    collectedOrders: LogisticsListingDTO[] = [];

    constructor(
        private datePipe: DatePipe,
        private orderService: LogisticsService,
        private logisticStatusService: LogisticsStatusService) {
    }

    public ngOnInit(): void {

        this.orderService.currentLogisticsObservable.subscribe({
            next: logistics => {

                this.allOrders = logistics;
                for (let logisticsListingDTO of logistics) {

                    logisticsListingDTO.orderStatusName = logisticsListingDTO?.orderStatus?.description;
                    logisticsListingDTO.updateDate = this.formatDate(logisticsListingDTO?.updateDate);
                    logisticsListingDTO.createdDate = this.formatDate(logisticsListingDTO?.createdDate);

                    // new orders
                    if (logisticsListingDTO?.orderStatusId === LogisticStatuses.OrderReadyForPackaging) {

                        this.readyForPackaging.push(logisticsListingDTO);
                    }
                    // collected

                    else if (logisticsListingDTO?.orderStatusId === LogisticStatuses.ClientCollected
                        || logisticsListingDTO?.orderStatusId === LogisticStatuses.OrderCollected
                        || logisticsListingDTO?.orderStatusId === LogisticStatuses.CourierCollected) {
                        this.collectedOrders.push(logisticsListingDTO);
                    }

                    //ready for collection.
                    else if (logisticsListingDTO?.orderStatusId === LogisticStatuses.OrderReadyForCollection) {
                        this.readyForCollection.push(logisticsListingDTO);
                    }
                    //processing logistics
                    else {
                        this.processingOrders.push(logisticsListingDTO);
                    }

                }

            }
        });

    }

    formatDate(date: string | Date): string {
        return this.datePipe.transform(date, "dd/MM/yyyy HH:mm");
    }

}
