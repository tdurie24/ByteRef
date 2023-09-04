import { NgModule } from "@angular/core";
import {
  AutoCompleteModule,
  ListBoxModule,
  MultiSelectModule,
} from "@syncfusion/ej2-angular-dropdowns";
import { DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import {
  NumericTextBoxModule,
  TextBoxModule,
} from "@syncfusion/ej2-angular-inputs";
import {
  ExcelExportService,
  GridModule,
  PdfExportService,
  ResizeService,
} from "@syncfusion/ej2-angular-grids";
import {
  DateRangePickerModule,
  DateTimePickerModule,
} from "@syncfusion/ej2-angular-calendars";
import { UploaderModule } from "@syncfusion/ej2-angular-inputs";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { ListViewModule } from "@syncfusion/ej2-angular-lists";
import { SwitchModule } from "@syncfusion/ej2-angular-buttons";
@NgModule({
  declarations: [],
  imports: [
    AutoCompleteModule,
    DropDownListModule,
    NumericTextBoxModule,
    GridModule,
    TextBoxModule,
    MultiSelectModule,
    ListBoxModule,
    DateRangePickerModule,
    UploaderModule,
    DatePickerModule,
    DateTimePickerModule,
    CheckBoxModule,
    ListViewModule,
    SwitchModule,
  ],
  exports: [
    AutoCompleteModule,
    DropDownListModule,
    NumericTextBoxModule,
    GridModule,
    TextBoxModule,
    MultiSelectModule,
    ListBoxModule,
    DateRangePickerModule,
    DateTimePickerModule,
    UploaderModule,
    DatePickerModule,
    CheckBoxModule,
    ListViewModule,
    SwitchModule,

  ],
  providers: [ResizeService, ExcelExportService, PdfExportService],
})
export class SyncfusionSharedModule { }
