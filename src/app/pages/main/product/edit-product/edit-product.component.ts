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
    unit_price: 0,
    ot_rate1: 0,
    ot_amount1: 0,
    selling_price: 0,
    product_image: ''
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
    this.httpService.requestCall('products/update/'+this.productId, ApiMethod.POST, formData)
      .subscribe({
        next: response => {
          this.loading = false
          if (response) {
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

  getProductDetails() {
    this.httpService.requestCall('products/' + this.productId, ApiMethod.GET)
      .subscribe({
        next: (response) => {
          this.productDetails = response

          if(response) {
            for (const key in this.productModel) {
              if(response[key]) {
                this.productModel[key] = response[key]
              }
            }
          }
          // this.productModel = response
          if(response.product_image) {
            this.imagePreview = response.product_image
          }
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

  calculateMarginAmount(event: Event) {
    this.productModel.it_amount1 = ((this.productModel.unit_price * this.productModel.it_rate1) / 100).toFixed(2)
  }

  getPriceWithVAT(event: Event) {
    if (this.productModel.ot_rate1 > 100) {
      this.productModel.ot_rate1 = 100
    }
    const vatAmount = ((this.productModel.selling_price * this.productModel.ot_rate1) / 100).toFixed(2)
    const vatAmountNumber = parseInt(vatAmount)
    this.productModel.ot_amount1 = this.productModel.selling_price + vatAmountNumber
  }
}
