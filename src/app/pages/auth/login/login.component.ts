import {Component} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {StorageService} from "../../../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../core/services/const";
import {HttpErrorResponse} from "@angular/common/http";
import {extractErrorMessages} from "../../../core/services/util/extractErrorMessages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userModel: any = {
    email: '',
    password: ''
  }
  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  constructor(private httpService: HttpService, private tokenService: StorageService, private router: Router) {
  }

  login() {
    this.loading = true
    this.httpService.requestCall('login', ApiMethod.POST, this.userModel).subscribe(
      (response) => {
        this.loading = false
        if (response.access_token) {
          this.tokenService.saveToken(response.access_token)
          this.router.navigate(['dashboard']).then(r => window.location.reload());
        }
        console.log(response)
      },
      (err: HttpErrorResponse) => {
        this.loading = false
        if (err.error.message) {
          this.errorMessage = err.error.message
        } else {
          this.errors = extractErrorMessages(err)
        }
        setTimeout(() => {
          this.errorMessage = ''
          this.errors = {}
        }, 5000)
      },
      () => console.log('Observer got a complete notification')
    )
  }
}
