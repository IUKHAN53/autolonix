import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  constructor(private httpService: HttpService, private router: Router) {
  }

  customerModel: any = {
    account_code: '',
    account_name: '',
    telephone: '',
    email: '',
    trn_no: '',
    address: '',
    city: '',
    country: '',
    type: 'customer',
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  saveCustomer() {
    this.loading = true
    this.httpService.requestCall('account-head/store', ApiMethod.POST, this.customerModel)
      .subscribe({
        next: response => {
          this.loading = false
          if (response) {
            // console.log(response)
            this.router.navigate(['/customer/all']);
          }
        },
        error: (error) => {
          this.loading = false
          if (error.error.message) {
            this.errorMessage = error.error.message
          } else {
            this.errors = extractErrorMessages(error)
          }
        },
        complete: () => {
          this.loading = false
          console.log('Observer got a complete notification')
        }
      })
  }
}
