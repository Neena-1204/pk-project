import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../components/components.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgZorroModule } from "../NgZorro.module";
import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeesComponent } from "./employees/employees.component";
import { MentorComponent } from "./mentor/mentor.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { DepartmentComponent } from "./department/department.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { OtComponent } from "./ot/ot.component";
import { TransportBillComponent } from "./transport-bill/transport-bill.component";
import { TransportBillEditComponent } from './transport-bill-edit/transport-bill-edit.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    AttendanceComponent,
    DashboardComponent,
    EmployeesComponent,
    MentorComponent,
    InventoryComponent,
    DepartmentComponent,
    TransactionComponent,
    OtComponent,
    TransportBillComponent,
    TransportBillEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgZorroModule,
  ],
})
export class PagesModule {}
