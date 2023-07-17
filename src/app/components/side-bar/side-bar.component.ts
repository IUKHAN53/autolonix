import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../core/services/http/http.service";
import {StorageService} from "../../core/services/storage/storage.service";
import {ApiMethod} from "../../core/services/const";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(private httpService: HttpService, private tokenService: StorageService, private router: Router) {
  }

  currentRoute: string = this.router.url

  logout(event: Event) {
    event.preventDefault()
    this.httpService.requestCall('logout', ApiMethod.POST).subscribe(
      response => {
        if (response.status) {
          this.tokenService.signOut()
        }
      },
      err => console.error(err.error),
      () => console.log('Observer got a complete notification')
    )
  }
}
