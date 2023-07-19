import {Component} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {StorageService} from "../../../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../core/services/const";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {extractErrorMessages} from "../../../core/services/util/extractErrorMessages";
import {environment} from "../../../../environments/environment";

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

  constructor(private http: HttpClient, private httpService: HttpService, private tokenService: StorageService, private router: Router) {
  }

  login() {
    this.loading = true
    this.httpService.requestCall('login', ApiMethod.POST, this.userModel).subscribe(
      (response) => {
        this.loading = false
        if (response.access_token) {
          this.tokenService.saveToken(response.access_token)
          this.http.post(`${environment.apiUrl}/me`, {}, {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + response.access_token
            })
          }).subscribe({
            next: (response) => {
              this.tokenService.saveUser(response)
              this.router.navigate(['dashboard']).then(r => window.location.reload());
            }
          })
        }
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
