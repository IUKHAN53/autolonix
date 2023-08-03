import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-create-sub-sub-category',
  templateUrl: './create-sub-sub-category.component.html',
  styleUrls: ['./create-sub-sub-category.component.css']
})
export class CreateSubSubCategoryComponent {
  constructor(private httpService: HttpService, private router: Router) {
    this.getDropdowns()
  }

  allCategories: any = []
  allSubCategories: any = []

  subSubCategoryModel: any = {
    parent_id: 0,
    drilldown_code: '',
    drilldown_type: 'Category',
    drilldown_description: '',
    drilldown_image: ''
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  imagePreview: string = 'https://samyak.co.in/wp-content/uploads/2021/04/image.jpg'

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

  getSubCategories(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: selectedValue})
      .subscribe({
        next: (response) => {
          this.allSubCategories = response
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  saveSubSubCategory(): void {
    this.loading = true
    const formData = new FormData()
    formData.append('parent_id', this.subSubCategoryModel.parent_id)
    formData.append('drilldown_code', this.subSubCategoryModel.drilldown_code)
    formData.append('drilldown_description', this.subSubCategoryModel.drilldown_description)
    formData.append('drilldown_image', this.subSubCategoryModel.drilldown_image)
    formData.append('drilldown_type', this.subSubCategoryModel.drilldown_type)
    this.httpService.requestCall('subcategories/store', ApiMethod.POST, formData)
      .subscribe({
        next: (response) => {
          this.loading = false
          if (response) {
            this.router.navigate(['/sub-sub-category/all']);
          }
        },
        error: (error) => {
          this.loading = false
          if (error.error.message) {
            this.errorMessage = error.error.message
          } else {
            this.errors = extractErrorMessages(error)
          }
        },
        complete: () => {
          this.loading = false
          console.log('Observer got a complete notification')
        }
      })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const result = new ImageSnippet(event.target.result, file)
      this.imagePreview = result.src
      this.subSubCategoryModel.drilldown_image = result.file
    });
    reader.readAsDataURL(file);
  }
}
