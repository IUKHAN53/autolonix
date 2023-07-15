import { Injectable } from '@angular/core';
import { 
  isEmpty,
  forEach,
  isArray,
  find,
  every,
  countBy,
  map,
  filter,
  orderBy,
  reduce
} from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class LodashService {

  constructor() { }

  get isEmpty() {
    return isEmpty
  }

  get isArray() {
    return isArray
  }

  get forEach() {
    return forEach
  }

  get find() {
    return find
  }

  get every() {
    return every;
  }

  get countBy() {
    return countBy
  }

  get map() {
    return map
  }

  get filter() {
    return filter
  }

  get orderBy() {
    return orderBy
  }

  get reduce() {
    return reduce;
  }

}
