import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {ErrorService} from '../error/error.service';
import {AuthEndPoints, ApiMethod} from '../const';
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  method?: ApiMethod;
  header = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    method: 'POST',
    mode: 'no-cors'
  }

  constructor(private http: HttpClient, private tokenService: StorageService, private _error: ErrorService) {
  }

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken()
    })
  };

  requestCall(apiEndPoint: string, method: ApiMethod, data?: any): Observable<any> {
    switch (method) {
      case ApiMethod.POST:
        return this.http.post(`${environment.apiUrl}/${apiEndPoint}`, data, this.httpOptions)
          .pipe(catchError(err => this.handleError(err, this)))
      case ApiMethod.GET:
        return this.http.get(`${environment.apiUrl}/${apiEndPoint}`, this.httpOptions)
          .pipe(catchError((err) => this.handleError(err, this)))
      case ApiMethod.PUT:
        return this.http.put(`${environment.apiUrl}/${apiEndPoint}`, data, this.httpOptions)
          .pipe(catchError((err) => this.handleError(err, this)))
      case ApiMethod.DELETE:
        return this.http.delete(`${environment.apiUrl}/${apiEndPoint}`, this.httpOptions)
          .pipe(catchError((err) => this.handleError(err, this)))
      default:
        return of(null)
    }
  }

  handleError(error: HttpErrorResponse, _self: this): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error)
      return of(null);
    } else {
      this._error.withError(error.status, error.message);
      return throwError({error: error.message, status: error.status})
    }
  }

  handleValidationErrors(errors: any) {
    if (errors && errors.errors) {
      const errorMessages = [];
      for (const field in errors.errors) {
        if (errors.errors.hasOwnProperty(field)) {
          const fieldErrors = errors.errors[field];
          errorMessages.push(...fieldErrors);
        }
      }
      console.log(errorMessages);
    }
  }

}
