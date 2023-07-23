import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditExpenseComponent} from './edit-expense.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditExpenseComponent}]

@NgModule({
  declarations: [
    EditExpenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditExpenseComponent]
})
export class EditExpenseModule {
}
