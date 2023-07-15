import {Component} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {StorageService} from "../../../core/services/storage/storage.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../core/services/const";

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

  register() {
    this.httpService.requestCall('register', ApiMethod.POST, this.userModel).subscribe(
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
