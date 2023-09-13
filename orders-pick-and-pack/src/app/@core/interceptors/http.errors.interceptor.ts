import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpErrorResponse, HttpInterceptor,
} from '@angular/common/http';
import { Observable} from 'rxjs';
import {NavigationExtras, Router} from "@angular/router";

import {catchError} from "rxjs/operators";


import {NbToastrService} from "@nebular/theme";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

    constructor(private router:Router, private toastrService: NbToastrService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error:HttpErrorResponse) => {
                if(error){
                    switch (error.status) {

                        case 400:
                            if(error.error.errors){
                                const modelStateErrors:any[] = [];
                                for (const key in error.error.errors){
                                    if(error.error.errors[key]){
                                        modelStateErrors.push(error.error.errors[key])
                                    }
                                }
                                throw  modelStateErrors;
                                // throw  modelStateErrors.flat();
                            }else{
                                this.toastrService.show(error.error,`Error ${error.status.toString()}`)
                            }
                            break;

                        case 401:
                            this.toastrService.show("You are not allowed to access this resource","Unauthorized",);
                            break;

                        case 404:
                            this.router.navigateByUrl("/errors/not-found");
                            break;

                        case 500:
                            this.toastrService.show("Something happened at our end, we are working so hard to fix this.","Internal Server Error");
                            const navigationExtras:NavigationExtras = {state:{error:error.error}}
                            this.router.navigateByUrl("/errors/server-error", navigationExtras);
                            break;

                        default:
                            this.router.navigateByUrl("/errors/server-error");
                            this.toastrService.show("Something unexpected happened please try again.","Unexpected Error");
                            console.log(error);
                            break;
                    }
                }
                throw  error;

            })
        );
    }
}
