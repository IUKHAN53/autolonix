import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllBrandComponent} from './all-brand.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

const routes: Routes = [{path: '', component: AllBrandComponent}]

@NgModule({
  declarations: [
    AllBrandComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllBrandComponent]
})
export class AllBrandModule {
}
