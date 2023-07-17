import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {Router} from "@angular/router";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

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
    drilldown_description: '',
    drilldown_image: null
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  imagePreview:string = 'https://samyak.co.in/wp-content/uploads/2021/04/image.jpg'

  saveCategory(event: Event): void {
    event.preventDefault()
    this.loading = true
    const formData = new FormData()
    formData.append('drilldown_code', this.categoryModel.drilldown_code)
    formData.append('drilldown_description', this.categoryModel.drilldown_description)
    formData.append('drilldown_image', this.categoryModel.drilldown_image)
    this.httpService.requestCall('categories', ApiMethod.POST, formData)
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
