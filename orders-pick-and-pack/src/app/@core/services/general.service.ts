import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToastNotification } from '../models/toast-notification.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  versionVisibleStates = { open: 'open', closed: 'closed' }

  private toastNotificationSrc: BehaviorSubject<IToastNotification> = new BehaviorSubject<IToastNotification>(null);
  toastNotification$: Observable<IToastNotification> = this.toastNotificationSrc.asObservable();

  private toggleState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  toggleState$: Observable<boolean> = this.toggleState.asObservable();


  constructor() { }

  /**
   * Push toast notificaton (Universal messeage for last event occured on system)
   * @param msg display message
   * @param created datetime stamp
   * @param type success/error
   */
  pushToastNotification(msg: string, type: string = 'Success', created: string = moment().format("YYYY/MM/DD HH:mm:ss")): void {
    const toast: IToastNotification = {
      message: msg,
      created: created,
      type: type
    }

    this.toastNotificationSrc.next(toast);
  }
}