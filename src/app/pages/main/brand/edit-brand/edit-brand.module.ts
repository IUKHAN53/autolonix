import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditBrandComponent} from './edit-brand.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: EditBrandComponent}]

@NgModule({
  declarations: [
    EditBrandComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [EditBrandComponent]
})
export class EditBrandModule {
}
