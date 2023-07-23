import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllCustomerComponent} from './all-customer.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

const routes: Routes = [{path: '', component: AllCustomerComponent}]

@NgModule({
  declarations: [
    AllCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllCustomerComponent]
})
export class AllCustomerModule {
}
