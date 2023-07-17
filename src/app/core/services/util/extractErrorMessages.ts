import {HttpErrorResponse} from '@angular/common/http';

export const extractErrorMessages = (errorResponse: HttpErrorResponse) => {
  const errors: any = [];
  if (errorResponse.error) {
    if (errorResponse.error.error) {
      for (const property in errorResponse.error.error) {
        if (errorResponse.error.error.hasOwnProperty(property)) {
          const propertyErrors: Array<string> = errorResponse.error.error[property];
          propertyErrors.forEach(error => errors.push(error));
        }
      }
    }
  }
  return errors;
};
