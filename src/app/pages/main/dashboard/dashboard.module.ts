import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {DashboardComponent} from "./dashboard.component";


const routes:Routes = [ { path:'', component: DashboardComponent } ]

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule{ }