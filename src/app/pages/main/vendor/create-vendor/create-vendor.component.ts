import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css']
})
export class CreateVendorComponent {
  constructor(private httpService: HttpService, private router: Router) {
  }

  vendorModel: any = {
    account_code: '',
    account_name: '',
    telephone: '',
    email: '',
    trn_no: '',
    address: '',
    city: '',
    country: '',
    managed_by: '',
    mobile_no: '',
    type: 'supplier'
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  saveVendor(event: Event) {
    event.preventDefault()
    this.loading = true
    this.httpService.requestCall('account-head/store', ApiMethod.POST, this.vendorModel)
      .subscribe({
        next: response => {
          this.loading = false
          if (response) {
            // console.log(response)
            this.router.navigate(['/vendor/all']);
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
