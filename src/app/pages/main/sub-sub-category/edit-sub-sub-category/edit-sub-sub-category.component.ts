import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";
import {environment} from "../../../../../environments/environment";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-edit-sub-sub-category',
  templateUrl: './edit-sub-sub-category.component.html',
  styleUrls: ['./edit-sub-sub-category.component.css']
})
export class EditSubSubCategoryComponent {
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.getDropdowns()
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['id']
    if (this.categoryId) {
      this.getCategoryDetail()
    }
  }

  categoryId: string | null = '';
  categoryDetail: any = {}

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

  getSubCategories() {
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: this.subSubCategoryModel.parent_id})
      .subscribe({
        next: (response) => {
          this.allSubCategories = response
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  getCategoryDetail() {
    this.httpService.requestCall('categories/' + this.categoryId, ApiMethod.GET)
      .subscribe({
        next: (response) => {
          if (response) {
            this.getParentCategory(response.parent_id)
            if(response) {
              for (const key in this.subSubCategoryModel) {
                if(response[key]) {
                  this.subSubCategoryModel[key] = response[key]
                }
              }
            }
            this.categoryDetail = response
            if(response.drilldown_image) {
              this.imagePreview = response.drilldown_image
            }
            console.log(this.subSubCategoryModel)
          }
        }
      })
  }

  getParentCategory(parent_id:number) {
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id})
      .subscribe({
        next: (response) => {
          if (response) {
            this.allSubCategories = response
          }
        }
      })
  }

  updateSubSubCategory(): void {
    this.loading = true
    const formData = new FormData()
    formData.append('parent_id', this.subSubCategoryModel.parent_id)
    formData.append('drilldown_code', this.subSubCategoryModel.drilldown_code)
    formData.append('drilldown_description', this.subSubCategoryModel.drilldown_description)
    formData.append('drilldown_image', this.subSubCategoryModel.drilldown_image)
    this.httpService.requestCall('subcategories/update/' + this.categoryId, ApiMethod.POST, formData)
      .subscribe({
        next: (response) => {
          this.loading = false
          if (response) {
            this.router.navigate(['/sub-category/all']).then(r => window.location.reload());
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
