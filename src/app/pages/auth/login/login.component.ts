import {Component} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {StorageService} from "../../../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../core/services/const";

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

  constructor(private httpService: HttpService, private tokenService: StorageService, private router: Router) {
  }

  login() {
    this.httpService.requestCall('login', ApiMethod.POST, this.userModel).subscribe(
      (response) => {
        if (response.access_token) {
          this.tokenService.saveToken(response.access_token)
          this.router.navigate(['dashboard']).then(r => window.location.reload());

        }
      },
      err => console.error(err.error),
      () => console.log('Observer got a complete notification')
    )
  }
}
