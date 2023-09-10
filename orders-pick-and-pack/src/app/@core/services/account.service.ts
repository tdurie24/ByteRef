import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {environment} from "../../../environments/environment";

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
                    const LoginResponseModel: LoginResponseModel = response;
                    if (LoginResponseModel) {
                        localStorage.setItem("LoginResponseModel", JSON.stringify(LoginResponseModel));
                        this.setCurrentLoginResponseModel(LoginResponseModel);
                        this.router.navigateByUrl('/members');
                    }
                })
            );
    }

    setCurrentLoginResponseModel(LoginResponseModel: LoginResponseModel | null) {
        this.currentLoginResponseModelSource.next(LoginResponseModel);
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
