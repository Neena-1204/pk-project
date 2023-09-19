import { Menu } from "../../models/menu";
import { navigationAnimation } from "../../animations";
import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.scss"],
  animations: [navigationAnimation],
})
export class BaseLayoutComponent implements OnInit {
  menu: Menu[] = [];
  user = JSON.parse(String(localStorage.getItem("user")));

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.user.role === "MENTOR")
      this.menu = [
        {
          title: "Home",
          icon: "home",
          path: "home",
        },
        {
          title: "Transaction",
          icon: "appstore",
          path: "transaction",
        },
        {
          title: "Attendance",
          icon: "team",
          path: "attendance",
        },
        {
          title: "Ot",
          icon: "team",
          path: "ot",
        },
      ];
    else
      this.menu = [
        {
          title: "Home",
          icon: "home",
          path: "home",
        },
        {
          title: "Attendance",
          icon: "team",
          path: "attendance",
        },
        {
          title: "Ot",
          icon: "team",
          path: "ot",
        },
        {
          title: "Transport Bill",
          icon: "appstore",
          path: "transport-bill",
        },
        {
          title: "Transaction",
          icon: "appstore",
          path: "transaction",
        },
        {
          title: "Inventory",
          icon: "appstore",
          path: "inventory",
        },
        {
          title: "Employee",
          icon: "user",
          path: "employees",
        },
        {
          title: "Mentor",
          icon: "crown",
          path: "mentor",
        },
        {
          title: "Department",
          icon: "appstore",
          path: "department",
        },
      ];
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animationState"]
    );
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
