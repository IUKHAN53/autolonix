import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.css']
})
export class RedirectionComponent {
  constructor(private router: Router) {
    console.log(" this blank")
    this.router.navigate(['/login'])
  }
}
