import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {environment} from "../../../environments/environment";
//import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {LoginResponseModel} from "../models/login.response.model";
import {map} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private currentLoginResponseModelSource = new BehaviorSubject<LoginResponseModel | null>(null);
    currentLoginResponseModel$ = this.currentLoginResponseModelSource.asObservable();
    accountBaseUrl: string = environment.apiUrl + "account/"

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    login(loginData: any) {
        return this.httpClient.post<LoginResponseModel>(this.accountBaseUrl + 'login', loginData)
            .pipe(
                map((response) => {
                    const loginResponse: LoginResponseModel = response;
                    if (loginResponse) {
                        localStorage.setItem("loginResponse", JSON.stringify(loginResponse));
                        this.setCurrentLoginResponseModel(loginResponse);
                       // this.router.navigateByUrl('/dashboard');
                    }
                })
            );
    }

    //todo come back and fix this part

    getDecodedAccessToken(token: string): any {
        try {
            //return jwt_decode(token);
        } catch(Error) {
            return null;
        }
    }

    setCurrentLoginResponseModel(LoginResponseModel: LoginResponseModel | null) {
        this.currentLoginResponseModelSource.next(LoginResponseModel);
    }

    demoLogin(){
        let jwtToken = environment.demoToken;
            let lrm : LoginResponseModel = {
            token : jwtToken,
            username : "danielmpofu",
            email : "danielmpofu123@gmail.com"
        };
        localStorage.setItem("loginResponse", JSON.stringify(lrm));
        this.setCurrentLoginResponseModel(lrm);
    }

    isLoggedIn() {
        let LoginResponseModel = localStorage.getItem('LoginResponseModel');
        if (!LoginResponseModel) return false;
        let LoginResponseModelD = JSON.parse(LoginResponseModel);
        this.setCurrentLoginResponseModel(LoginResponseModelD);
        return true;
    }

    signOut() {
        localStorage.clear();
        this.setCurrentLoginResponseModel(null);
    }

    register(value: any) {
        return this.httpClient.post(this.accountBaseUrl, value).pipe(
            map(response => {
                if (!response) {
                    console.log("no response");
                    return
                }

                this.login({
                    "LoginResponseModelname": value.LoginResponseModelname,
                    "password": value.password
                });
            })
        )
    }

}
