import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBrandComponent } from './create-brand.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: CreateBrandComponent}]

@NgModule({
  declarations: [
    CreateBrandComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [CreateBrandComponent]
})
export class CreateBrandModule { }
