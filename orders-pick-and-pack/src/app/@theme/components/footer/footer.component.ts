import { Component, OnDestroy, OnInit } from '@angular/core';
import { IToastNotification } from 'app/@core/models/toast-notification.model';
import { GeneralService } from 'app/@core/services/general.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
 
    <span class="created-by">
      Copyright &copy; {{ year }}
    </span>
  `,
})
export class FooterComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public year: string = moment().format('YYYY');

  toast: IToastNotification;

  constructor(private _generalService: GeneralService) { }

  ngOnInit(): void {
    this._generalService.toastNotification$
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { this.toast = res })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
