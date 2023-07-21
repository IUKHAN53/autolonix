import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditDepartmentComponent} from './edit-department.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditDepartmentComponent}]

@NgModule({
  declarations: [
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditDepartmentComponent]
})
export class EditDepartmentModule {
}
