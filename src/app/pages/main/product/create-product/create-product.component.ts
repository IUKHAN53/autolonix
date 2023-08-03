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
    const inputValue: any = event.target.value
    const params = {
      unit_price: type !== 'unit_price' ? this.productModel.unit_price : inputValue,
      margin_percentage: type !== 'margin_percentage' ? this.margin_percentage : inputValue,
      margin_amount: type !== 'margin_amount' ? this.margin_amount : inputValue,
      margin_inclusive_price: type !== 'margin_inclusive_price' ? this.margin_inclusive_price : inputValue,
      ot_rate1: type !== 'ot_rate1' ? this.productModel.ot_rate1 : inputValue,
      ot_amount1: type !== 'ot_amount1' ? this.productModel.ot_amount1 : inputValue,
      vat_amount_inclusive_price: type !== 'vat_amount_inclusive_price' ? this.vat_amount_inclusive_price : inputValue,
      total_amount: type !== 'total_amount' ? this.total_amount : inputValue,
    }
    console.log(this.genericCalculation(params))
    // this.margin_amount = this.productModel.unit_price - this.productModel.last_purchase_cost
    // margin_amount_percentage = ((1 / this.productModel.last_purchase_cost) * margin_amount) * 100
    // price_inclusive_margin = margin_amount + this.productModel.last_purchase_cost
    // total =
  }

  genericCalculation(params:any) {
    // this.productModel.unit_price = params.unit_price
    // this.margin_percentage = ((1 / this.productModel.last_purchase_cost) * params.margin_amount) * 100
    // this.margin_amount = params.margin_amount


    const result = {
      unit_price: 0,
      margin_percentage: 0,
      margin_amount: 0,
      margin_inclusive_price: 0,
      vat_percentage: 0,
      vat_amount: 0,
      vat_amount_inclusive_price: 0,
      total_amount: 0,
    };

    // Calculate total amount
    if (params.unit_price !== undefined && params.margin_percentage !== undefined) {
      result.total_amount = params.unit_price + (params.unit_price * (params.margin_percentage / 100));
    } else if (params.unit_price !== undefined && params.margin_amount !== undefined) {
      result.total_amount = params.unit_price + params.margin_amount;
    } else if (params.margin_inclusive_price !== undefined && params.margin_amount !== undefined) {
      result.total_amount = params.margin_inclusive_price + params.margin_amount;
    }

    // Calculate margin_percentage
    if (params.unit_price !== undefined && params.margin_amount !== undefined) {
      result.margin_percentage = ((result.total_amount - params.unit_price) / params.unit_price) * 100;
    }

    // Calculate margin_amount
    if (params.unit_price !== undefined && params.margin_percentage !== undefined) {
      result.margin_amount = params.unit_price * (params.margin_percentage / 100);
    } else if (params.unit_price !== undefined && params.margin_inclusive_price !== undefined) {
      result.margin_amount = params.margin_inclusive_price - params.unit_price;
    }

    // Calculate margin_inclusive_price
    if (params.unit_price !== undefined && params.margin_amount !== undefined) {
      result.margin_inclusive_price = params.unit_price + params.margin_amount;
    }

    // Calculate vat_amount
    if (result.total_amount !== undefined && params.vat_percentage !== undefined) {
      result.vat_amount = result.total_amount * (params.vat_percentage / 100);
    } else if (result.total_amount !== undefined && params.vat_amount_inclusive_price !== undefined) {
      result.vat_amount = params.vat_amount_inclusive_price - result.total_amount;
    }

    // Calculate vat_percentage
    if (result.total_amount !== undefined && params.vat_amount !== undefined) {
      result.vat_percentage = (result.vat_amount / result.total_amount) * 100;
    }

    // Calculate vat_amount_inclusive_price
    if (result.total_amount !== undefined && params.vat_amount !== undefined) {
      result.vat_amount_inclusive_price = result.total_amount + result.vat_amount;
    }

    return result;
  }

  // calculateMarginAmount() {
  //   this.productModel.last_purchase_cost = (this.productModel.unit_price).toFixed(AppConfig.DECIMAL_POINTS)
  //
  //
  //   this.productModel.it_amount1 = ((this.productModel.unit_price * this.productModel.it_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS)
  //   this.price_inclusive_margin = (parseFloat(this.productModel.unit_price) + parseFloat(this.productModel.it_amount1)).toFixed(AppConfig.DECIMAL_POINTS)
  //   this.totalAmount = (parseFloat(this.productModel.unit_price) + parseFloat(this.vat_amount)).toFixed(AppConfig.DECIMAL_POINTS)
  // }
  //
  // getPriceWithVAT() {
  //   this.vat_amount = ((parseFloat(this.price_inclusive_margin) * parseFloat(this.productModel.ot_rate1)) / 100).toFixed(AppConfig.DECIMAL_POINTS)
  //   this.productModel.ot_amount1 = parseFloat(this.productModel.unit_price + parseFloat(this.vat_amount)).toFixed(AppConfig.DECIMAL_POINTS)
  //   this.totalAmount = (parseFloat(this.productModel.unit_price) + parseFloat(this.productModel.it_amount1) + parseFloat(this.vat_amount)).toFixed(AppConfig.DECIMAL_POINTS)
  // }
}
