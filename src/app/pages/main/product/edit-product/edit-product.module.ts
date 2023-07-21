import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProductComponent} from './edit-product.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditProductComponent}]

@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditProductComponent]
})
export class EditProductModule {
}
