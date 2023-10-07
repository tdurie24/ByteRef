import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import jwt_decode from 'jwt-decode';
import {DecodedAccessTokenDetails} from "../models/decoded.access.token.details";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private decodedAccessTokenDetails = new BehaviorSubject<DecodedAccessTokenDetails | null>(null);
    currentLoggedInUserDetails$ = this.decodedAccessTokenDetails.asObservable();

    constructor() {
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
