import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import jwt_decode from 'jwt-decode';
import {DecodedAccessTokenDetails} from "../models/decoded.access.token.details";
import {BranchModel} from "../models/branch.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private decodedAccessTokenDetails = new BehaviorSubject<DecodedAccessTokenDetails | null>(null);
    currentLoggedInUserDetails$ = this.decodedAccessTokenDetails.asObservable();


    userBranches: BranchModel[] = [];

    private selectedBranch = new BehaviorSubject<BranchModel | null>(null);
    userSelectedBranch$ = this.selectedBranch.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    getBranches() {
        // for now use this fake data
        this.userBranches = this.fakeBranches();
        this.selectedBranch.next(this.userBranches[0]);
        // todo uncomment here when you get the endpoint url
        // this.httpClient.get<BranchModel[]>("branches-endpoint-url").subscribe(
        //     {
        //         next: response => {
        //             this.userBranches = response;
        //         }
        //     }
        // )
    }


    switchBranch(branchId: string) {
        let b = this.userBranches.find(branch => branch.id === branchId);
        if (b !== null || b !== undefined) {
            this.selectedBranch.next(b);
        } else {
            console.log(b);
            // something went wrong lets default to the first branch, just safety but this will never happen.
            this.selectedBranch.next(this.userBranches[0]);
        }
    }


   private fakeBranches(): BranchModel[] {
        return [
            {
                id: "test-id",
                siteCode: "senwes-sa-east",
                siteDescription: "just a test branch no sweat",
                siteAddress: "12 roseland avenue, jbh",
                province: "test province",
                shopifyLocationId: "location2"
            }, {
                id: "test-id2",
                siteCode: "senwes-sa-west",
                siteDescription: "just a test branch no sweat",
                siteAddress: "12 roseland avenue, jbh",
                province: "test province",
                shopifyLocationId: "location2"
            }, {
                id: "test-id3",
                siteCode: "senwes-sa-north",
                siteDescription: "just a test branch no sweat",
                siteAddress: "12 roseland avenue, jbh",
                province: "test province",
                shopifyLocationId: "location2"
            }, {
                id: "test-id4",
                siteCode: "senwes-sa-south",
                siteDescription: "just a test branch no sweat",
                siteAddress: "12 roseland avenue, jbh",
                province: "test province",
                shopifyLocationId: "location2"
            },
        ]
    }

    private setLoggedInUserDetails(loggedInUser: any) {
        this.decodedAccessTokenDetails.next(loggedInUser);
    }

    getDecodedAccessToken(): any {
        let tokenString = localStorage.getItem('token');
        if (!tokenString) {
            tokenString = environment.demoToken;
        }
        try {
            let decodedToken = jwt_decode(tokenString);
            this.setLoggedInUserDetails(decodedToken);
        } catch (Error) {
            return null;
        }
    }

}
