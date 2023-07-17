import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllProductComponent} from "./all-product.component";
import {Router, RouterModule, Routes} from "@angular/router";
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [{path: '', component: AllProductComponent}]

@NgModule({
  declarations: [AllProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule
  ],
  exports: [AllProductComponent]
})
export class AllProductModule {
}
