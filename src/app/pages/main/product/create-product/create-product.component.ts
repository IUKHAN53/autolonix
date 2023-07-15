import {Component} from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productModel: any = {}

  submitForm(formData: any): void {
    console.log(formData)
  }
}
