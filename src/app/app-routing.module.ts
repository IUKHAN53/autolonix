import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {Error404Component} from "./components/error404/error404.component";
import {Error500Component} from "./components/error500/error500.component";
import {NoGuardGuard} from "./core/guards/no-guard.guard";
import {SessionGuard} from "./core/guards/session.guard";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {RedirectionGuard} from "./core/guards/redirection.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {RedirectionComponent} from "./components/redirection/redirection.component";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [NoGuardGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'notFound',
    pathMatch: "full",
    component: Error404Component
  },
  {
    path: 'serverError',
    pathMatch: "full",
    component: Error500Component
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  //   pathMatch: "full",
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    // if (this.router.url === '/') {
    //   this.router.navigate(['/login'])
    // }
  }
}
