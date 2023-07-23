import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  ProductSelectionModalComponent
} from "../../../../components/product-selection-modal/product-selection-modal.component";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent {

  constructor(private modalService: BsModalService) {
  }

  bsModalRef: BsModalRef | undefined;

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  invoiceModel: any = {}

  saveInvoice(event: Event) {
    event.preventDefault()
  }

  openModal() {
    this.bsModalRef = this.modalService.show(ProductSelectionModalComponent);
  }
}
