import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MainRoutingModule} from "./main-routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ],
  exports: [ ]
})
export class MainModule { }
