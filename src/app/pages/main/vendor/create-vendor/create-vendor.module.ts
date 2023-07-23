import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateVendorComponent} from './create-vendor.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateVendorComponent}]

@NgModule({
  declarations: [
    CreateVendorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateVendorComponent]
})
export class CreateVendorModule {
}
