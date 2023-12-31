import {Component, OnInit} from '@angular/core';
import {loadCldr, setCurrencyCode, setCulture, L10n} from '@syncfusion/ej2-base';
import {SenwesAuthorizationService} from '@senwes/senwes-authorization';
import {environment} from 'environments/environment';
import {from, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CustomLoaderService} from "./@core/services/custom.loader.service";
import {LogisticsService} from "./@core/services/order.service";
import {LogisticsStatusService} from "./@core/services/logistics.status.service";
import {AccountService} from "./@core/services/account.service";
import {DistributionCompaniesService} from "./@core/services/distribution.companies.service";

declare var require: any;

loadCldr(
    require('cldr-data/main/en-ZA/ca-gregorian.json'),
    require('cldr-data/main/en-ZA/timeZoneNames.json'),
    require('cldr-data/main/en-ZA/numbers.json'),
    require('cldr-data/main/en-ZA/currencies.json'),
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/supplemental/currencyData.json'),
    require('../assets/js/customZANumbers.json'),
);

@Component({
    selector: 'ngx-app',
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {

    isLoading: boolean = false;

    constructor(private _authService: SenwesAuthorizationService,
                private orderService: LogisticsService,
                private logisticStatusService: LogisticsStatusService,
                private accountService: AccountService,
                private distributionService: DistributionCompaniesService,
                private customLoaderService: CustomLoaderService) {
        setCurrencyCode('ZAR');
        setCulture('en-ZA');
    }

    ngOnInit(): void {
        const appId: string = environment.appId;
        const isAuthenticated = from(this._authService.authenticateToken(appId));
        this._authService.authenticateToken(appId);
        //authenticate the app to access swagger endpoints using the token hardcoded in environment variables.
        this.accountService.getDecodedAccessToken();
        this.accountService.getBranches();
        this.logisticStatusService.getLogisticStatuses();
        this.orderService.getLogistics();
        this.distributionService.getDistributionCompanies();
        this.customLoaderService.isLoading.subscribe({
            next: isLoading => {
                this.isLoading = isLoading;
            }
        })
    }
}
