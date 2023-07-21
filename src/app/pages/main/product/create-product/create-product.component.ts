import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {Router} from "@angular/router";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  constructor(private httpService: HttpService, private router: Router) {
    this.getDropdowns()
  }

  productModel: any = {
    product_code: "",
    barcode: "",
    product_name: "",
    specification: "",
    category_id: 0,
    sub_category_id: 0,
    sub_sub_category_id: 0,
    description: "",
    unit: "",
    pack_details: 0,
    product_type: "",
    department_id: 0,
    brand_id: 0,
    last_supplier_id: 0,
    pack_qty: 0,
    last_purchase_cost: 0,
    it_rate1: 0,
    it_amount1: 0,
    unit_price: 0,
    ot_rate1: 0,
    ot_amount1: 0,
    product_image: null
  }

  dropdowns: any = []
  subCategories: any = []
  subSubCategories: any = []
  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  imagePreview: string = 'https://samyak.co.in/wp-content/uploads/2021/04/image.jpg'

  getDropdowns(): void {
    this.httpService.requestCall('products/create', ApiMethod.GET)
      .subscribe({
        next: response => {
          this.dropdowns = response
          console.log(this.dropdowns)
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  getSubCategories(event: Event, type: string): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: selectedValue})
        .subscribe({
          next: response => {
            if (type === 'sub') {
              this.subCategories = response
            } else {
              this.subSubCategories = response
            }
          },
          error: (error) => console.error(error.error),
          complete: () => console.log('Observer got a complete notification')
        })
    } else {
      if (type === 'sub') {
        this.subCategories = []
      } else {
        this.subSubCategories = []
      }
    }

  }

  submitForm(): void {
    this.loading = true
    const formData = new FormData()
    for (const key in this.productModel) {
      formData.append(key, this.productModel[key])
    }
    this.httpService.requestCall('products', ApiMethod.POST, formData)
      .subscribe({
        next: response => {
          this.loading = false
          if (response) {
            // console.log(response)
            this.router.navigate(['/product/all']).then(r => window.location.reload());
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
      this.productModel.product_image = result.file
    });
    reader.readAsDataURL(file);
  }
}
