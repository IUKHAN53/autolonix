import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditInvoiceComponent} from './edit-invoice.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditInvoiceComponent}]

@NgModule({
  declarations: [
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditInvoiceComponent]
})
export class EditInvoiceModule {
}
