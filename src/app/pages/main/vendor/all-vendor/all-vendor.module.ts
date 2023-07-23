import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllVendorComponent} from './all-vendor.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

const routes: Routes = [{path: '', component: AllVendorComponent}]

@NgModule({
  declarations: [
    AllVendorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllVendorComponent]
})
export class AllVendorModule {
}
