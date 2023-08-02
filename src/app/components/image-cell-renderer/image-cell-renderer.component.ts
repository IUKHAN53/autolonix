import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-image-cell-renderer',
  templateUrl: './image-cell-renderer.component.html',
  styleUrls: ['./image-cell-renderer.component.css']
})
export class ImageCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = environment.serverAssetUrl+params.data.product_image;
    // this.params = '';
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  protected readonly console = console;
}
