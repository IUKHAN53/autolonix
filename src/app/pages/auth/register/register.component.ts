import {Component} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {StorageService} from "../../../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../core/services/const";
import {extractErrorMessages} from "../../../core/services/util/extractErrorMessages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userModel: any = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private httpService: HttpService, private tokenService: StorageService, private router: Router) {
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  register() {
    this.loading = true
    this.httpService.requestCall('register', ApiMethod.POST, this.userModel).subscribe(
      (response) => {
        this.loading = false
        if (response.access_token) {
          this.tokenService.saveToken(response.access_token)
          this.router.navigate(['dashboard']).then(r => window.location.reload());
        }
      },
      err => {
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
