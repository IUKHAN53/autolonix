import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSubCategoryComponent} from './create-sub-category.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateSubCategoryComponent}]

@NgModule({
  declarations: [
    CreateSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateSubCategoryComponent]
})
export class CreateSubCategoryModule {
}
