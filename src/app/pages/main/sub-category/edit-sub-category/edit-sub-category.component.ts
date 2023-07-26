import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {
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

  subCategoryModel: any = {
    parent_id: 0,
    drilldown_code: '',
    drilldown_type: 'Category',
    drilldown_description: '',
    drilldown_image: ''
  }

  parent_id = '0'

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  imagePreview: string = 'https://samyak.co.in/wp-content/uploads/2021/04/image.jpg'

  getDropdowns(): void {
    this.httpService.requestCall('categories', ApiMethod.POST)
      .subscribe({
        next: (data) => {
          this.allCategories = data
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
            this.categoryDetail = response
            if(response.drilldown_image) {
              this.imagePreview = this.categoryDetail.drilldown_image
            }
            this.subCategoryModel = this.categoryDetail
          }
        }
      })
  }

  updateSubCategory(event: Event): void {
    event.preventDefault()
    this.loading = true
    const formData = new FormData()
    formData.append('parent_id', this.subCategoryModel.parent_id)
    formData.append('drilldown_code', this.subCategoryModel.drilldown_code)
    formData.append('drilldown_description', this.subCategoryModel.drilldown_description)
    formData.append('drilldown_image', this.subCategoryModel.drilldown_image)
    this.httpService.requestCall('subcategories/update/'+this.categoryId, ApiMethod.POST, formData)
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
      this.subCategoryModel.drilldown_image = result.file
    });
    reader.readAsDataURL(file);
  }

  getSubCategories(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.httpService.requestCall('categories/' + selectedValue, ApiMethod.GET)
      .subscribe({
        next: (response) => {
          if (response && response.children) {
            this.allSubCategories = response.children
            this.subCategoryModel.parent_id = selectedValue
          }
        },
        error: (error) => {
        },
        complete: () => {
          console.log('Observer got a complete notification')
        }
      })
  }
}
