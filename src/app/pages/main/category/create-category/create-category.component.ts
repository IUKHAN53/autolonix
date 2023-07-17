import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  constructor(private httpService: HttpService, private router:Router) {
  }

  categoryModel: any = {
    drilldown_code: '',
    drilldown_description: ''
  }

  saveCategory(event: Event): void {
    event.preventDefault()
    this.httpService.requestCall('categories', ApiMethod.POST, this.categoryModel)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/category/all']).then(r => window.location.reload());
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }
}
