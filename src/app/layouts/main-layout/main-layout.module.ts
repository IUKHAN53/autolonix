import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainLayoutComponent} from "./main-layout.component";
import { RouterModule } from '@angular/router';
import {SideBarComponent} from "../../components/side-bar/side-bar.component";

@NgModule({
  declarations: [
    MainLayoutComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ MainLayoutComponent ]
})
export class MainLayoutModule { }
