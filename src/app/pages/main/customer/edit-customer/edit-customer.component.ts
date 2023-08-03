import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{
  customerId: string | null = '';
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['id']
    if (this.customerId) {
      this.getCustomerDetail()
    }
  }

  customerModel: any = {
    account_code: '',
    account_name: '',
    telephone: '',
    email: '',
    trn_no: '',
    address: '',
    city: '',
    country: ''
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  getCustomerDetail() {
    this.httpService.requestCall('account-head/'+this.customerId, ApiMethod.GET)
      .subscribe({
        next: response => {
          if (response) {
            // console.log(response)
            this.customerModel = response
          }
        },
        error: (error) => {
        },
        complete: () => {
          console.log('Observer got a complete notification')
        }
      })
  }
  updateCustomer() {
    this.loading = true
    this.httpService.requestCall('account-head/update/'+this.customerId, ApiMethod.POST, this.customerModel)
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
