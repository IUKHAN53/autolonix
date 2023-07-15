import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AllProductComponent } from './all-product/all-product.component';

const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-product/all-product.module').then(m => m.AllProductModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductModule)
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
export class ProductModule {
}
