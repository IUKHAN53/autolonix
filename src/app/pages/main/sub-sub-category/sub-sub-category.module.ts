import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'sub-sub-category',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-sub-sub-category/all-sub-sub-category.module').then(m => m.AllSubSubCategoryModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-sub-sub-category/create-sub-sub-category.module').then(m => m.CreateSubSubCategoryModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-sub-sub-category/edit-sub-sub-category.module').then(m => m.EditSubSubCategoryModule)
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
export class SubSubCategoryModule { }
