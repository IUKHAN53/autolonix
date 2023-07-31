import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../services/storage/storage.service';
import {HttpService} from "../services/http/http.service";
import {ApiMethod} from "../services/const";

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private router: Router, private tokenService: StorageService, private httpService: HttpService) {
  }

  user: any = null
  errorMessage: string = ''
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    this.httpService.requestCall('me', ApiMethod.POST)
      .subscribe({
        next: (response: any) => {
          this.user = response.user
        },
      })
    if (!this.tokenService.getToken() && this.tokenService.getUser()) {
      window.localStorage.clear()
      this.router.navigate(['login']);
    }
    return true;
  }
}
