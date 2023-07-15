import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from '../util/util.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private cookies: CookieService,
    private _util: UtilService,
    private _router: Router
  ) { }

  signOut() {
    window.localStorage.clear();
    window.location.reload()
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  public saveUser(user:any) {
    delete user.UserPassword;
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, this._util.encrypt(JSON.stringify(user)));
  }


  public getUser() {
    let userDetail = window.localStorage.getItem(USER_KEY) || '';
    return JSON.parse(this._util.decrypt(userDetail));
  }

}
