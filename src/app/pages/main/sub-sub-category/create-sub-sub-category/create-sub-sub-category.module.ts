import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSubSubCategoryComponent } from './create-sub-sub-category.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateSubSubCategoryComponent}]

@NgModule({
  declarations: [
    CreateSubSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateSubSubCategoryComponent]
})
export class CreateSubSubCategoryModule { }
