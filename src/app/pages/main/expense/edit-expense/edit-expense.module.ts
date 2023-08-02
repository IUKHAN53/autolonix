import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditExpenseComponent} from './edit-expense.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";

const routes: Routes = [{path: '', component: EditExpenseComponent}]

@NgModule({
  declarations: [
    EditExpenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [EditExpenseComponent]
})
export class EditExpenseModule {
}
