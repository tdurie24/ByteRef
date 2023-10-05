import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MENU_ITEMS } from './pages-menu';
import { environment } from 'environments/environment';
import { GeneralService } from 'app/@core/services/general.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
  <ngx-one-column-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet></router-outlet>
  <span class="fixed-bottom p-3 text-center" style="margin-bottom: 4rem; opacity: 0.25">
    {{appVersion}}
  </span>
</ngx-one-column-layout>`
})
export class PagesComponent implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  //Add as public var is class
  public appVersion: string = `${environment.appVersion}`
  menu = MENU_ITEMS;

  constructor(private _generalService: GeneralService) { }


  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}


