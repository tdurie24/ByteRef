import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAccordionModule, NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbListModule, NbSelectModule, NbTabsetModule, NbTooltipModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { FilterService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbTooltipModule,
    NbActionsModule,
    NbListModule,
    NbTabsetModule,
    NbBadgeModule,
    NbAccordionModule,
    NbAlertModule,
    NbSelectModule,
  ],
  exports: [
    NbCardModule,
    ThemeModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbTooltipModule,
    NbActionsModule,
    NbListModule,
    NbTabsetModule,
    NbBadgeModule,
    NbAccordionModule,
    NbAlertModule,
    NbSelectModule,
  ], providers: [FilterService, SortService, ToolbarService]
})
export class NebularSharedModule { }
