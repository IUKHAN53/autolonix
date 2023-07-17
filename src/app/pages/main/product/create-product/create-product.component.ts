import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {Router} from "@angular/router";

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
    ot_amount1: 0
  }

  dropdowns: any = []
  subCategories: any = []
  subSubCategories: any = []

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
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: selectedValue, type: 'list'})
      .subscribe({
        next: response => {
          if (type === 'sub') {
            this.subCategories = response
          } else {
            this.subSubCategories = response
          }
          console.log(response)
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  submitForm(formData: any): void {
    console.log(formData)
    this.httpService.requestCall('products', ApiMethod.POST, this.productModel)
      .subscribe({
        next: response => {
          if (response) {
            this.router.navigate(['/product/all']).then(r => window.location.reload());
          }
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }
}
