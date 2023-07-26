import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LayoutModule} from "./layouts/layout.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ImageCellRendererComponent} from "./components/image-cell-renderer/image-cell-renderer.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedirectionComponent } from './components/redirection/redirection.component';
import { DynamicTableRowComponent } from './components/dynamic-table-row/dynamic-table-row.component';
import { ProductSelectionModalComponent } from './components/product-selection-modal/product-selection-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCellRendererComponent,
    NotFoundComponent,
    RedirectionComponent,
    DynamicTableRowComponent,
    ProductSelectionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
