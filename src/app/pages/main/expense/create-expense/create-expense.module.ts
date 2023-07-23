import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateExpenseComponent } from './create-expense.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";

const routes: Routes = [{path: '', component: CreateExpenseComponent}]

@NgModule({
  declarations: [
    CreateExpenseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [CreateExpenseComponent]
})
export class CreateExpenseModule { }
