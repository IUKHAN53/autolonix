import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditVendorComponent} from './edit-vendor.component';
import {RouterModule, Routes} from "@angular/router";
import {CreateVendorComponent} from "../create-vendor/create-vendor.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditVendorComponent}]

@NgModule({
  declarations: [
    EditVendorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditVendorComponent]
})
export class EditVendorModule {
}
