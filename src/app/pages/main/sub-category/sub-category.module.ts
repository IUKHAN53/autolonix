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
