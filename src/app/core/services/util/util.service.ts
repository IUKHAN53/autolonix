import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  encryptKey: string = 'AIzaSyBnOzbMr90FUKJOFHDErlHbX1WGIkBlLYPE'

  constructor() { }

  decrypt(data:string, key:string = this.encryptKey): string {
    return AES.decrypt(data, key).toString(enc.Utf8)
  }

  encrypt(data: string, key:string = this.encryptKey): string {
    return AES.encrypt(data, key).toString();
  }

  randomNumber(digit: number = 60000) {
    return Math.floor(100000 + Math.random() * digit);
  }

  areAllValuesNullOrZeroOrEmptyString(obj:any) {
    for (const key in obj) {
      const value = obj[key];
      if (value !== null && value !== 0 && value !== "") {
        return false;
      }
    }
    return true;
  }
}
