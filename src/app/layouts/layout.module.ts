import { NgModule } from '@angular/core';
import {AuthLayoutModule} from "./auth-layout/auth-layout.module";
import {MainLayoutModule} from "./main-layout/main-layout.module";

@NgModule({
  declarations: [],
  imports: [
    MainLayoutModule,
    AuthLayoutModule
  ],
  exports: [
    MainLayoutModule,
    AuthLayoutModule
  ]
})
export class LayoutModule { }
