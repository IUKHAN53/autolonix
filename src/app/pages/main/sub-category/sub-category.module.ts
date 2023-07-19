import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'sub-category',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-sub-category/all-sub-category.module').then(m => m.AllSubCategoryModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-sub-category/create-sub-category.module').then(m => m.CreateSubCategoryModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-sub-category/edit-sub-category.module').then(m => m.EditSubCategoryModule)
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
export class SubCategoryModule {
}
