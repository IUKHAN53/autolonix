import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'vendor',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-vendor/all-vendor.module').then(m => m.AllVendorModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-vendor/create-vendor.module').then(m => m.CreateVendorModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-vendor/edit-vendor.module').then(m => m.EditVendorModule)
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
export class VendorModule { }
