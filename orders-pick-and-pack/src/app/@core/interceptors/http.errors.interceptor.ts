import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpErrorResponse, HttpInterceptor,
} from '@angular/common/http';
import { Observable} from 'rxjs';
import {NavigationExtras, Router} from "@angular/router";
// import {ToastrModule, ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";
import {ToastService} from "../services/toast.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

    constructor(private router:Router, private toastrService:ToastrService) {}

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
                                this.toastrService.error(error.error,`Error ${error.status.toString()}`)
                            }
                            break;

                        case 401:
                            this.toastrService.error("You are not allowed to access this resource","Unauthorized",);
                            break;

                        case 404:
                            this.router.navigateByUrl("/errors/not-found");
                            break;

                        case 500:
                            this.toastrService.error("Something happened at our end, we are working so hard to fix this.","Internal Server Error");
                            const navigationExtras:NavigationExtras = {state:{error:error.error}}
                            this.router.navigateByUrl("/errors/server-error", navigationExtras);
                            break;

                        default:
                            this.router.navigateByUrl("/errors/server-error");
                            this.toastrService.error("Something unexpected happened please try again.","Unexpected Error");
                            console.log(error);
                            break;
                    }
                }
                throw  error;

            })
        );
    }
}
