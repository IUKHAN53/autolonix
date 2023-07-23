import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllInvoiceComponent } from './all-invoice.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";

const routes: Routes = [{path: '', component: AllInvoiceComponent}]

@NgModule({
  declarations: [
    AllInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllInvoiceComponent]
})
export class AllInvoiceModule { }
