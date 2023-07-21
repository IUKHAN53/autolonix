import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSubSubCategoryComponent } from './all-sub-sub-category.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: AllSubSubCategoryComponent}]

@NgModule({
  declarations: [
    AllSubSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    FormsModule
  ],
  exports: [AllSubSubCategoryComponent]
})
export class AllSubSubCategoryModule { }
