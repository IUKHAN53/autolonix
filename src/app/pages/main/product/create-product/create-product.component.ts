import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod, AppConfig} from "../../../../core/services/const";
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
    category_id: "",
    sub_category_id: "",
    sub_sub_category_id: "",
    description: "",
    unit: "",
    pack_details: 0,
    product_type: "",
    department_id: 0,
    product_brand_id: 0,
    last_supplier_id: '',
    pack_qty: '',
    last_purchase_cost: 0,
    it_rate1: 0,
    it_amount1: 0,
    unit_price: 0,
    ot_rate1: 0,
    ot_amount1: 0,
    product_image: ""
  }

  margin_percentage: any = 0
  margin_amount: any = 0
  total_amount: any = 0
  margin_inclusive_price: any = 0
  vat_amount_inclusive_price: any = 0

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


  doCalculation(event: any, type: string) {
    const inputValue: any = event.target ? event.target.value : 0
    switch (type) {
      case 'unit_price':
        this.margin_amount = parseFloat(((this.margin_percentage * parseFloat(inputValue)) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        this.margin_inclusive_price = parseFloat(inputValue) + parseFloat(this.margin_amount)
        this.productModel.ot_amount1 = parseFloat(((this.margin_inclusive_price * this.productModel.ot_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        if (this.productModel.ot_rate1 > 0) {
          this.vat_amount_inclusive_price = this.margin_amount + this.productModel.ot_amount1
        }
        break
      case 'margin_percentage':
        this.margin_amount = parseFloat(((parseFloat(inputValue) * this.productModel.unit_price) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        this.margin_inclusive_price = parseFloat(this.productModel.unit_price) + parseFloat(this.margin_amount)
        this.productModel.ot_amount1 = parseFloat(((this.margin_inclusive_price * this.productModel.ot_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        if (this.productModel.ot_rate1 > 0) {
          this.vat_amount_inclusive_price = this.margin_amount + this.productModel.ot_amount1
        }
        break
      case 'margin_amount':

        this.margin_percentage = parseFloat(((parseFloat(inputValue) / this.productModel.unit_price) * 100).toFixed(AppConfig.DECIMAL_POINTS))
        this.margin_inclusive_price = this.productModel.unit_price + parseFloat(inputValue)
        this.productModel.ot_amount1 = parseFloat(((this.margin_inclusive_price * this.productModel.ot_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        if (this.productModel.ot_rate1 > 0) {
          this.vat_amount_inclusive_price = this.margin_amount + this.productModel.ot_amount1
        }
        break
      case 'margin_inclusive_price':
        this.productModel.unit_price = parseFloat(inputValue) - this.margin_amount
        this.productModel.ot_amount1 = parseFloat(((this.margin_inclusive_price * this.productModel.ot_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        if (this.productModel.ot_rate1 > 0) {
          this.vat_amount_inclusive_price = this.margin_amount + this.productModel.ot_amount1
        }
        break
      case 'ot_rate1':
        this.productModel.ot_amount1 = parseFloat(((this.margin_inclusive_price * parseFloat(inputValue)) / 100).toFixed(AppConfig.DECIMAL_POINTS))
        if (this.productModel.ot_rate1 > 0) {
          this.vat_amount_inclusive_price = this.margin_amount + this.productModel.ot_amount1
        }
        break
      case 'ot_amount1':
        // this to be tested
        // this.productModel.ot_rate1 = parseFloat((parseFloat(inputValue) / this.margin_amount).toFixed(AppConfig.DECIMAL_POINTS))
        // this.vat_amount_inclusive_price = this.productModel.unit_price + this.productModel.ot_amount1
        break
      // case 'vat_amount_inclusive_price':
      //   // this.productModel.ot_rate1 = parseFloat((this.productModel.ot_amount1 / parseFloat(inputValue)).toFixed(AppConfig.DECIMAL_POINTS))
      //   // this.productModel.ot_amount1 = parseFloat(((this.margin_inclusive_price * this.productModel.ot_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS))
      //   break
      default:
        break
    }
    this.productModel.last_purchase_cost = this.productModel.unit_price
    this.total_amount = this.vat_amount_inclusive_price + this.productModel.unit_price
  }
}
