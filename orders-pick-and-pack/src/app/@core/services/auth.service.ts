import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SenwesAuthorizationService } from '@senwes/senwes-authorization';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private senwesAuth: SenwesAuthorizationService,
    private _http: HttpClient
  ) {
    this.senwesAuth.initializeUser();
  }

  public isAuthenticated(): Observable<boolean> {
    const url = `${environment.auth_service}/Authentication/validate/token`;
    return this._http.get<boolean>(url);
  }
}
