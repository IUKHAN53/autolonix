import { Component } from '@angular/core';
import {ILoadingCellRendererAngularComp} from "ag-grid-angular";
import {ILoadingCellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-custom-loading-cell-renderer',
  templateUrl: './custom-loading-cell-renderer.component.html',
  styleUrls: ['./custom-loading-cell-renderer.component.css']
})
export class CustomLoadingCellRenderer implements ILoadingCellRendererAngularComp {
  // @ts-ignore
  public params: ILoadingCellRendererParams & { loadingMessage: string };

  agInit(params: ILoadingCellRendererParams & { loadingMessage: string }): void {
    this.params = params;
  }
}
