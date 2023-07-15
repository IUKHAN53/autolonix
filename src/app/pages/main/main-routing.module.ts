import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m=> m.DashboardModule)
      },
      {
        path:'',
        loadChildren: () => import('./product/product.module').then( m=> m.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
