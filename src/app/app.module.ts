import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LayoutModule} from "./layouts/layout.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ImageCellRendererComponent} from "./components/image-cell-renderer/image-cell-renderer.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedirectionComponent } from './components/redirection/redirection.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCellRendererComponent,
    NotFoundComponent,
    RedirectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
