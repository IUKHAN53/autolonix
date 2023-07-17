import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCategoryComponent} from './create-category.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{path: '', component: CreateCategoryComponent}]

@NgModule({
  declarations: [
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [CreateCategoryComponent]
})
export class CreateCategoryModule {
}
