import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css']
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {

  private params: any;
  private roleId: any;

  agInit(params: any): void {
    this.params = params;
    console.log(this.params)
    this.roleId = this.params.roleId
  }

  handleDelete(event: Event) {
    event.preventDefault()
    this.params.deleteClick(this.params.value)
  }

  handleEdit(event: Event) {
    event.preventDefault()
    this.params.editClick(this.params.value)
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
