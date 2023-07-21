import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryId: string | null = '';
  categoryDetail: any = {}

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['id']
    if (this.categoryId) {
      this.getCategoryDetail()
    }
  }

  categoryModel: any = {
    drilldown_code: '',
    drilldown_description: '',
    drilldown_image: null
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  imagePreview: string = 'https://samyak.co.in/wp-content/uploads/2021/04/image.jpg'

  getCategoryDetail() {
    this.httpService.requestCall('categories/' + this.categoryId, ApiMethod.GET)
      .subscribe({
        next: (response) => {
          if (response) {
            this.categoryDetail = response
            this.imagePreview = this.categoryDetail.drilldown_image
            this.categoryModel = this.categoryDetail
          }
        }
      })
  }

  updateCategory(event: Event): void {
    event.preventDefault()
    this.loading = true
    const formData = new FormData()
    formData.append('drilldown_code', this.categoryModel.drilldown_code)
    formData.append('drilldown_description', this.categoryModel.drilldown_description)
    formData.append('drilldown_image', this.categoryModel.drilldown_image)
    this.httpService.requestCall('categories/update/'+this.categoryId, ApiMethod.POST, formData)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.router.navigate(['/category/all']).then(r => window.location.reload());
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
      this.categoryModel.drilldown_image = result.file
    });
    reader.readAsDataURL(file);
  }

}
