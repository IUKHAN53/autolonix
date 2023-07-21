import { CanActivateFn } from '@angular/router';

export const RedirectionGuard: CanActivateFn = (route, state) => {
  console.log(route)
  return true
};
