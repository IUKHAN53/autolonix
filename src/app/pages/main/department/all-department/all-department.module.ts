import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllDepartmentComponent} from './all-department.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

const routes: Routes = [{path: '', component: AllDepartmentComponent}]

@NgModule({
  declarations: [
    AllDepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllDepartmentComponent]
})
export class AllDepartmentModule {
}
