import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateDepartmentComponent} from './create-department.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateDepartmentComponent}]

@NgModule({
  declarations: [
    CreateDepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateDepartmentComponent]
})
export class CreateDepartmentModule {
}
