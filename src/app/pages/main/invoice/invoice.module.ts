import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";



const routes: Routes = [
  {
    path: 'invoice',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-invoice/all-invoice.module').then(m => m.AllInvoiceModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-invoice/create-invoice.module').then(m => m.CreateInvoiceModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-invoice/edit-invoice.module').then(m => m.EditInvoiceModule)
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

export class InvoiceModule { }
