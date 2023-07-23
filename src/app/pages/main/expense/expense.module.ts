import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";



const routes: Routes = [
  {
    path: 'expense',
    children: [
      {
        path: 'all',
        loadChildren: () => import('./all-expense/all-expense.module').then(m => m.AllExpenseModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create-expense/create-expense.module').then(m => m.CreateExpenseModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit-expense/edit-expense.module').then(m => m.EditExpenseModule)
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

export class ExpenseModule { }
