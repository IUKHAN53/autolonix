import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateProductComponent} from "./create-product.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateProductComponent}]

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateProductComponent]
})
export class CreateProductModule {
}
