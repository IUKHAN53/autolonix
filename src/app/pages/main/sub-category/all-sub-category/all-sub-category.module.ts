import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllSubCategoryComponent} from './all-sub-category.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";

const routes: Routes = [{path: '', component: AllSubCategoryComponent}]

@NgModule({
  declarations: [
    AllSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AgGridModule
  ],
  exports: [AllSubCategoryComponent]
})
export class AllSubCategoryModule {
}
