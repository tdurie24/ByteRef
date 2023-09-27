import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'fullfilment-details',
  templateUrl: './fullfilment-details.component.html',
  styleUrls: ['./fullfilment-details.component.scss']
})
export class FullfilmentDetailsComponent implements OnInit {

  constructor(
      private dialogRef: NbDialogRef<FullfilmentDetailsComponent>
  ) { }

  ngOnInit(): void {
  }

  submitChanges() {

  }

  closeModal() {
    this.dialogRef.close();
  }
}
