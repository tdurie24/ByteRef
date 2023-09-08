import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router, private toastService: ToastService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._auth.isAuthenticated().pipe(
      map(e => {
        console.log('Authenticated');
        if (e) {
          return true;
        } else {
          this.toastService.showError('Unauthorized', 'You are not authorized to access this resource');
          return false;
        }
      }), catchError((err) => {
        console.log('Authentication Error', err);
        this.toastService.showError('Unauthorized', 'You are not authorized to access this resource');
        return of(false);
      })
    );
  }
}
