import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-customer/all-customer.module').then(m => m.AllCustomerModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-customer/create-customer.module').then(m => m.CreateCustomerModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-customer/edit-customer.module').then(m => m.EditCustomerModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
