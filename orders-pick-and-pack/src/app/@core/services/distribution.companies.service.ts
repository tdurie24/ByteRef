import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {LogisticsStatus} from "../models/logistics.status";
import {HttpClient} from "@angular/common/http";
import {DistributionCompanyModel} from "../models/distribution.company.model";

@Injectable({
    providedIn: 'root'
})
export class DistributionCompaniesService {

    private distributionCompaniesBaseUrl = environment.apiUrl + "DistributionCompanies";
    private distributionCompanies: DistributionCompanyModel[] = [];
    private distributionSource: BehaviorSubject<DistributionCompanyModel[] | null> = new BehaviorSubject<DistributionCompanyModel[] | null>(null);
    distributionSourceObservable = this.distributionSource.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    getDistributionCompanies() {
        this.httpClient.get<DistributionCompanyModel[]>(this.distributionCompaniesBaseUrl).subscribe(
            {
                next: response => {
                    this.distributionSource.next(response);
                    console.log(response);
                }, error: err => {
                    console.log(err);
                }
            }
        )
    }

    getDistributionCompany(id: string): DistributionCompanyModel {
        return this.distributionCompanies.find(c=> c.id === id);
    }

}
