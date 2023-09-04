import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NbDialogService, NbWindowRef, NbWindowService } from "@nebular/theme";
import { ToastService } from "app/@core/services/toast.service";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { handleError } from "app/@core/shared/handleServiceError";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { MenuEventArgs } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  selector: "logistics",
  templateUrl: "./logistics.component.html",
  styleUrls: ["./logistics.component.scss"],

})
export class LogisticsComponent implements OnInit, OnDestroy {
  @ViewChild("edit") editEvent: TemplateRef<any>;
  @ViewChild("view") viewEvent: TemplateRef<any>;
 // @ViewChild("attendeeView") attendeeView: TemplateRef<any>;
  @ViewChild("confirmationDialog") confirmationDialog: TemplateRef<any>;
  @ViewChild("eventGrid") eventGrid: GridComponent;

  public data: Object[];

  protected windowRef: NbWindowRef;

  // grid settings
  toolbarOptions: object;
  filterSettings: Object;
  isLoading: boolean = true;
  pageSettings: Object = { pageSizes: true, pageSize: 10, currentPage: 1 };
  wrapSettings = { wrapMode: 'Content' };
  private _destroy$: Subject<void> = new Subject<void>();


  private eventActions = { create: "create", update: "update" };
  event_action = this.eventActions.create;

  private attendeeActions = { add: "add", remove: "remove" };
  attendee_action = this.attendeeActions.add;
  attendee_event = ''

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
        text: 'Edit',
        id: 'Edit'
      },
      view: {
        text: 'View',
        id: 'View'
      },
      cancel: {
        text: 'Cancel',
        id: 'Delete'
      },
      scan: {
        text: 'Scan',
        id: 'Scan'
      }
    }
    ;


  sortOptions = { columns: [{ field: 'dateFrom', direction: 'Descending' }] };

  constructor(
    private toastService: ToastService,
    private windowService: NbWindowService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.toolbarOptions = [
      { text: "Search", tooltipTetxt: "Search", id: "filter" },
    ];
this.data=  [
  {
    OrderNumber: 10248, LogisicsStatus: 'Received', AssignedTo: 'Teddy', TotalItems: 2,
    DateUpdated: new Date(), DateCreated: new Date()
  }];
    this.setScope();
    this.filterSettings = { type: "Menu" };
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

  openEventUpdateView(object: any) {
    this.event_action = this.eventActions.update;
    this.openWindow(this.editEvent, 'Update', object);
  }

  //openAttendeeView(object: any, action: string) {
  //  this.attendee_action = action;
//this.openWindow(this.attendeeView, object.eventName, object);
 // }

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
      }
    );
  }


  toolbarHandler(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "add":
        this.event_action = this.eventActions.create;
        this.openWindow(this.editEvent, 'Create Event');
        break;
    }
  }

  eventActionHandler(eventUpdate: any) {

    let endpoint = "";
    let errMsg = ''
    let successMsg = ''
    if (this.event_action === this.eventActions.create) {
      endpoint = "AddEvent";
      successMsg = "Successfully Created Event"
      errMsg = "Error Creating Event"
    }

    if (this.event_action === this.eventActions.update) {
      endpoint = "UpdateEvent";
      successMsg = "Successfully Updated Event"
      errMsg = "Error Updating Event"
    }
  }

  eventOptionsHandler(args: MenuEventArgs, data: any) {

    if (args.item.id === "Edit") {
      this.openEventUpdateView(data)
    }
    if (args.item.id === "View") {
      this.openWindow(this.viewEvent, data.eventName, data)
    }
   // if (args.item.id === "AddAttendees") {
    //  this.openAttendeeView(data, this.attendeeActions.add)
//}
   // if (args.item.id === "RemoveAttendees") {
   //   this.openAttendeeView(data, this.attendeeActions.remove)
   // }
    if (args.item.id === "DeleteEvent") {
      this.openWindow(this.confirmationDialog, 'Delete Event', data)
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  deleteEvent(data: any) {
    this.event_action = this.eventActions.update
    data.isActive = false
    if (!data.isActive) {
      this.eventActionHandler(data)
    }
  }

  close() {
    this.windowRef.close();
  }
}