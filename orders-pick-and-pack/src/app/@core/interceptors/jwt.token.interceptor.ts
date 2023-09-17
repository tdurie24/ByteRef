
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {take} from "rxjs/operators";
import {AccountService} from "../services/account.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentLoginResponseModel$.pipe(take(1)).subscribe({
      next: userResponseModel  =>{
        if(userResponseModel){
          request = request.clone({
            setHeaders:{
              Authorization: `Bearer ${userResponseModel.token}`
            }
          });
        }
      }
    });

    return next.handle(request);
  }
}
