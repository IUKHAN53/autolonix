import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCategoryComponent } from './all-category.component';
import {RouterModule, Routes} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";

const routes: Routes = [{path: '', component: AllCategoryComponent}]

@NgModule({
  declarations: [
    AllCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllCategoryComponent]
})
export class AllCategoryModule { }
