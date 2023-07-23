import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpenseComponent } from './all-expense.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: AllExpenseComponent}]

@NgModule({
  declarations: [
    AllExpenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    FormsModule
  ],
  exports: [AllExpenseComponent]
})
export class AllExpenseModule { }
