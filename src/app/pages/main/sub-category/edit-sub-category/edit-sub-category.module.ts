import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditSubCategoryComponent} from './edit-sub-category.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditSubCategoryComponent}]

@NgModule({
  declarations: [
    EditSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditSubCategoryComponent]
})
export class EditSubCategoryModule {
}
