import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css']
})
export class CreateSubCategoryComponent {
  constructor(private httpService: HttpService, private router: Router) {
    this.getDropdowns()
  }

  allCategories: any = []

  subCategoryModel: any = {
    parent_id: 0,
    drilldown_code: '',
    drilldown_description: ''
  }

  getDropdowns(): void {
    this.httpService.requestCall('products/create', ApiMethod.GET)
      .subscribe({
        next: (data) => {
          this.allCategories = data.categories
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }
  saveSubCategory(event: Event): void {
    event.preventDefault()
    this.httpService.requestCall('subcategories/store', ApiMethod.POST, this.subCategoryModel)
      .subscribe({
        next: (response) => {
          if(response) {
            this.router.navigate(['/sub-category/all']).then(r => window.location.reload());
          }
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }
}
