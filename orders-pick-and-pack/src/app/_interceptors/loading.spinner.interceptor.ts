import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable} from 'rxjs';

import {delay, finalize} from "rxjs/operators";
import {CustomLoaderService} from "../_services/custom.loader.service";

@Injectable()
export class LoadingIndicatorsInterceptor implements HttpInterceptor {

    constructor(private customLoaderService:CustomLoaderService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.customLoaderService.showLoadingSpinner();
        return next.handle(request).pipe(delay(1000), finalize(()=>{
            this.customLoaderService.hideLoadingSpinner();
        }))
    }
}
