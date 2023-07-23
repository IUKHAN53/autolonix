import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './create-invoice.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateInvoiceComponent}]

@NgModule({
  declarations: [
    CreateInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateInvoiceComponent]
})
export class CreateInvoiceModule { }
