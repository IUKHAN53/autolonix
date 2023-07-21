import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'department',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-department/all-department.module').then(m => m.AllDepartmentModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-department/create-department.module').then(m => m.CreateDepartmentModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-department/edit-department.module').then(m => m.EditDepartmentModule)
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
export class DepartmentModule {
}
