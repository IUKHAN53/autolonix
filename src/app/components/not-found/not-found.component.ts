import {Component} from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private router: Router) {
    this.router.navigate(['/login'])
  }
}
