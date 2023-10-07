
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
import {environment} from "../../../environments/environment";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let tokenString = localStorage.getItem('token');
    if (!tokenString) {
      tokenString = environment.demoToken;
    }

    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${tokenString}`
      }
    });

    return next.handle(request);
  }
}
