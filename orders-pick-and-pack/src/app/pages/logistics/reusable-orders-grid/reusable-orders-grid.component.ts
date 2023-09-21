import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbWindowRef, NbWindowService} from "@nebular/theme";
import {Subject} from "rxjs";
import {ToastService} from "../../../@core/services/toast.service";
import {ActivatedRoute} from "@angular/router";
import {LogisticsService} from "../../../@core/services/order.service";
import {takeUntil} from "rxjs/operators";
import {ClickEventArgs} from "@syncfusion/ej2-navigations";
import {LogisticsModel} from "../../../@core/models/logistics.model";
import {LogisticsDetailComponent} from "../logistics-detail-modal/logistics-detail.component";
import {MenuEventArgs} from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  selector: 'reusable-orders-grid',
  templateUrl: './reusable-orders-grid.component.html',
  styleUrls: ['./reusable-orders-grid.component.scss']
})
export class ReusableOrdersGridComponent implements OnInit {

  @Input('data') data: any;



  protected windowRef: NbWindowRef;
//caister -leopold and tongo
  // grid settings
  toolbarOptions: object;
  filterSettings: Object;

  pageSettings: Object = {pageSizes: true, pageSize: 10, currentPage: 1};
  wrapSettings = {wrapMode: 'Content'};
  private _destroy$: Subject<void> = new Subject<void>();

  private eventActions = {create: "create", update: "update"};
  event_action = this.eventActions.create;

  filter_scope = {
    created: "created",
    active: "active",
    inactive: "inactive",
    all_events: "all_logistics",
  };

  _scope = this.filter_scope.active;

  listOfEventOptions =
      {
        edit: {
          text: 'View/Edit',
          id: 'Edit',
        },

        cancel: {
          text: 'Cancel',
          id: 'Delete',
        },

        delete: {
          text: 'Delete',
          id: 'Delete',
        }
      };

  sortOptions = {columns: [{field: 'dateFrom', direction: 'Descending'}]};

  constructor(
      private toastService: ToastService,
      private route: ActivatedRoute,
      private orderService: LogisticsService,
      private dialogService: NbDialogService,
      private windowService: NbWindowService,
  ) { }

  ngOnInit(): void {

    this.toolbarOptions = [
      {text: "Search", tooltipText: "Search", id: "filter"},
    ];

    this.setScope();
    this.filterSettings = {type: "Menu"};
  }

  setScope() {
    this.route.queryParams
        .pipe(takeUntil(this._destroy$))
        .subscribe((param: { event_filter: String }) => {
          if (param.event_filter) {
            switch (param.event_filter) {
              case this.filter_scope.active:
                this._scope = this.filter_scope.active;
                // get active jobs
                break;
              default:
                this._scope = this.filter_scope.active;
                // get active jobs
                break;
            }
          }
        });
  }

  openWindow(modalRef: TemplateRef<any>, viewTitle: string, data?) {
    const btnConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
      close: true,
    };

    this.windowRef = this.windowService.open(
        modalRef,
        {
          title: viewTitle,
          closeOnEsc: false,
          context: data,
          windowClass: 'windowfull-screen',
        },
    );
  }

  toolbarHandler(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "add":
        this.event_action = this.eventActions.create;
        //this.openWindow(this.editEvent, 'Create Event');
        break;
    }
  }

  eventActionHandler(eventUpdate: any) {
    let endpoint = "";
    let errMsg = '';
    let successMsg = '';
    if (this.event_action === this.eventActions.create) {
      endpoint = "AddEvent";
      successMsg = "Successfully Created Event";
      errMsg = "Error Creating Event";
    }

    if (this.event_action === this.eventActions.update) {
      endpoint = "UpdateEvent";
      successMsg = "Successfully Updated Event";
      errMsg = "Error Updating Event";
    }
  }

  public onOpenEditLogisticDialog(order: any): void {
    let logistic: LogisticsModel = this.orderService.getLogisticModel(order?.Id);
    this.orderService.setSelectedOrder(logistic);
    console.log(logistic);
    this.dialogService.open(LogisticsDetailComponent, {
      context: {
        //title: 'Priview or edit Logistic Data',
      }
    });
  }

  eventOptionsHandler(args: MenuEventArgs, data: any) {
    console.log(data);
    if (args.item.id === "Edit") {

      if (data) {
        this.onOpenEditLogisticDialog(data);
      }
    }
    if (args.item.id === "View") {
      this.toastService.showSuccess("Coming soon","We are still on this one")
    }

  }

  deleteEvent(data: any) {
    this.event_action = this.eventActions.update;
    data.isActive = false;
    if (!data.isActive) {
      this.eventActionHandler(data);
    }
  }

  close() {
    this.windowRef.close();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
