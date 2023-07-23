import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCustomerComponent} from './create-customer.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateCustomerComponent}]

@NgModule({
  declarations: [
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateCustomerComponent]
})
export class CreateCustomerModule {
}
