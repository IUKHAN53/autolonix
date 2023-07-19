import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: '',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: '',
        loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule)
      },
      {
        path: '',
        loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
      },
      {
        path: '',
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
