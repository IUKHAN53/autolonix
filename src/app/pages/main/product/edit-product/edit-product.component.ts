import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod, AppConfig} from "../../../../core/services/const";
import {extractErrorMessages} from "../../../../core/services/util/extractErrorMessages";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: string | null = ''
  productDetails: any = {}

  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id']
    if (this.productId) {
      this.getDropdowns()
      this.getProductDetails()
    }
  }

  productModel: any = {
    product_code: "",
    barcode: "",
    product_name: "",
    specification: "",
    category_id: '',
    sub_category_id: '',
    sub_sub_category_id: '',
    description: "",
    unit: "",
    pack_details: '',
    product_type: "",
    department_id: '',
    product_brand_id: '',
    last_supplier_id: '',
    pack_qty: '',
    last_purchase_cost: '',
    it_rate1: 0,
    it_amount1: 0,
    average_cost: 0,
    ot_rate1: 0,
    ot_amount1: 0,
    selling_price: 0,
    product_image: ''
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
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  getSubCategories(type: string): void {
    let id = type === 'sub' ? this.productModel.sub_category_id : this.productModel.sub_sub_category_id
    if (id) {
      this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: id})
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
    this.httpService.requestCall('products/update/' + this.productId, ApiMethod.POST, formData)
      .subscribe({
        next: response => {
          this.loading = false
          if (response) {
            this.router.navigate(['/product/all']);
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

  getProductDetails() {
    this.httpService.requestCall('products/' + this.productId, ApiMethod.GET)
      .subscribe({
        next: (response) => {
          this.productDetails = response
          if (response) {
            for (const key in this.productModel) {
              if (response[key]) {
                if (key !== 'product_image') {
                  this.productModel[key] = response[key]
                }
                this.doCalculation('', '')
              }
            }
          }
          console.log(response)
          // this.productModel = response
          // let image = response.product_image.split("/")
          // let isDefaultImage = false
          // image.map((item: any) => {
          //   if (item === "default_product.png") {
          //     isDefaultImage = true
          //   }
          // })
          // if (!isDefaultImage) {
            this.imagePreview = response.product_image
          // }
          if (response.sub_category_id) {
            this.getSubCategories('sub')
          }
          if (response.sub_sub_category_id) {
            this.getSubCategories('subSub')
          }
        },
        error: (err) => {

        },
        complete: () => {

        }
      })
  }

  doCalculation(event: any = null, type: string) {
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


  calculateMarginAmount() {
    this.productModel.last_purchase_cost = parseFloat(this.productModel.unit_price).toFixed(AppConfig.DECIMAL_POINTS)

    // margin_amount = this.productModel.unit_price - this.productModel.last_purchase_cost
    // margin_amount_percentage = ((1/this.productModel.last_purchase_cost)*margin_amount)*100
    // price_inclusive_margin = margin_amount + this.productModel.last_purchase_cost
    // total =



    // this.productModel.it_amount1 = ((this.productModel.unit_price * this.productModel.it_rate1) / 100).toFixed(AppConfig.DECIMAL_POINTS)
    // this.price_inclusive_margin = (parseFloat(this.productModel.unit_price) + parseFloat(this.productModel.it_amount1)).toFixed(AppConfig.DECIMAL_POINTS)
    // this.totalAmount = (parseFloat(this.productModel.unit_price) + parseFloat(this.productModel.it_amount1) + parseFloat(this.vat_amount)).toFixed(AppConfig.DECIMAL_POINTS)
  }

  // getPriceWithVAT() {
  //   this.vat_amount = ((parseFloat(this.price_inclusive_margin) * parseFloat(this.productModel.ot_rate1)) / 100).toFixed(AppConfig.DECIMAL_POINTS)
  //   this.productModel.ot_amount1 = parseFloat(this.productModel.unit_price + parseFloat(this.vat_amount)).toFixed(AppConfig.DECIMAL_POINTS)
  //   this.totalAmount = (parseFloat(this.productModel.unit_price) + parseFloat(this.productModel.it_amount1) + parseFloat(this.vat_amount)).toFixed(AppConfig.DECIMAL_POINTS)
  // }
}
