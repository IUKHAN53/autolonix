import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditCategoryComponent} from './edit-category.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditCategoryComponent}]

@NgModule({
  declarations: [
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditCategoryComponent]
})
export class EditCategoryModule {
}
