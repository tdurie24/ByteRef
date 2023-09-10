import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderModel} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class CustomLoaderService {

  requestsCount: number = 0;

  private isLoadingFlag = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingFlag.asObservable();
  constructor() {}

  showLoadingSpinner() {
    this.requestsCount++;
    this.isLoadingFlag.next(true);
    console.log(`on going requests  --- ${this.requestsCount}`);
  }

  hideLoadingSpinner() {
    this.requestsCount--;
    if (this.requestsCount <= 0) {
      this.requestsCount = 0;
      this.isLoadingFlag.next(false);
    }

  }
}
