import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private menu: BehaviorSubject<string> = new BehaviorSubject('')
  menu$ = this.menu.asObservable()

  private subMenu: BehaviorSubject<string> = new BehaviorSubject('')
  subMenu$ = this.subMenu.asObservable()

  constructor() { }

  changeMenuStatus(name:string) {
    this.menu.next(name)
  }

  changeSubMenuStatus(name:string) {
    this.subMenu.next(name)
  }
}
