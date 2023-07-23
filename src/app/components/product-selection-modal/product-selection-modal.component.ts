import {AfterViewInit, Component} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-product-selection-modal',
  templateUrl: './product-selection-modal.component.html',
  styleUrls: ['./product-selection-modal.component.css']
})
export class ProductSelectionModalComponent {
  constructor(public bsModalRef: BsModalRef) {
  }

  onClose() {
    this.bsModalRef.hide()
  }
}
