import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditSubSubCategoryComponent} from './edit-sub-sub-category.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditSubSubCategoryComponent}]

@NgModule({
  declarations: [
    EditSubSubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditSubSubCategoryComponent]
})
export class EditSubSubCategoryModule {
}
