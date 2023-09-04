import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: NbToastrService,
    private generalService: GeneralService,
  ) { }

  showSuccess(title: string, msg: string, status: NbComponentStatus = 'success', timer = 6000) {
    this.toastrService.show(msg, title, { status, duration: timer });
    this.generalService.pushToastNotification(msg);
  }

  showWarning(title: string, msg: string, status: NbComponentStatus = 'warning', timer = 6000) {
    this.toastrService.show(msg, title, { status, duration: timer });
  }

  showError(title: string, error: string, status: NbComponentStatus = 'danger', timer = 6000) {
    this.toastrService.show(error, title, { status, duration: timer, toastClass: 'toastFull' });
    this.generalService.pushToastNotification(title, 'Error');
  }
}
