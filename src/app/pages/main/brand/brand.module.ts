import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'brand',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-brand/all-brand.module').then(m => m.AllBrandModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-brand/create-brand.module').then(m => m.CreateBrandModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-brand/edit-brand.module').then(m => m.EditBrandModule)
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
export class BrandModule {
}
