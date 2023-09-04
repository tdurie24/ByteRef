import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  constructor(private _router: Router) { }

  goToPage(page: string, params) {
    this._router.navigate(["/pages/" + page], { queryParams: params });
  }
}
