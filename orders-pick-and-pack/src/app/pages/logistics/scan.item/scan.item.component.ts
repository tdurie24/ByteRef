import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {OrderService} from "../../../@core/services/order.service";
import {Order} from "../../../@core/models/order";

@Component({
  selector: 'scan-item-component',
  templateUrl: './scan.item.component.html',
  styleUrls: ['./scan.item.component.scss']
})
export class ScanItemComponent implements OnInit {

  itemForm: FormGroup = new FormGroup({});
  @Input('selectedOrder') selectedOrder: Order;
  scannedItemId:string|undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  componentIsInvalid(control: string, formName: string): boolean {
    const forms = {
      'itemForm': this.itemForm
    }
    return (forms[formName].get(control).touched || forms[formName].get(control).dirty) && !forms[formName].get(control).valid
  }

  handleCancelButton() {

  }

  handleScanButton() {
    if(this.scannedItemId){
      let scannedItem = this.orderService.getItem(this.scannedItemId);
      this.orderService.addScannedItem(this.selectedOrder,scannedItem);
      //do we really have to go to the service
      //maybe for the api call
    }

  }
}
