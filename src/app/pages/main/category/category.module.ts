import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'category',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-category/all-category.module').then(m => m.AllCategoryModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-category/create-category.module').then(m => m.CreateCategoryModule)
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
export class CategoryModule { }
