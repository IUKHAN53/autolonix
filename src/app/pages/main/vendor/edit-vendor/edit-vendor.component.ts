import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit{
  vendorId: string | null = '';
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.vendorId = this.route.snapshot.params['id']
    if (this.vendorId) {
      this.getVendorDetail()
    }
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
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  getVendorDetail() {
    this.httpService.requestCall('account-head/'+this.vendorId, ApiMethod.GET)
      .subscribe({
        next: response => {
          if (response) {
            // console.log(response)
            this.vendorModel = response
          }
        },
        error: (error) => {
        },
        complete: () => {
          console.log('Observer got a complete notification')
        }
      })
  }
  updateVendor(event: Event) {
    event.preventDefault()
    this.loading = true
    this.httpService.requestCall('account-head/update/'+this.vendorId, ApiMethod.POST, this.vendorModel)
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
