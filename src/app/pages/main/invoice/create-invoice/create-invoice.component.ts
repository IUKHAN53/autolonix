import {Component} from '@angular/core';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent {

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  invoiceModel: any = {

  }
  saveInvoice(event: Event) {
    event.preventDefault()
  }
}
