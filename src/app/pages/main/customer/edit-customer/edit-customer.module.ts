import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditCustomerComponent} from './edit-customer.component';
import {RouterModule, Routes} from "@angular/router";
import {CreateCustomerComponent} from "../create-customer/create-customer.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditCustomerComponent}]

@NgModule({
  declarations: [
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditCustomerComponent]
})
export class EditCustomerModule {
}
