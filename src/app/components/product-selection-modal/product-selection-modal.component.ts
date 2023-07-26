import {Component, EventEmitter, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {HttpService} from "../../core/services/http/http.service";
import {ApiMethod} from "../../core/services/const";

@Component({
  selector: 'app-product-selection-modal',
  templateUrl: './product-selection-modal.component.html',
  styleUrls: ['./product-selection-modal.component.css']
})
export class ProductSelectionModalComponent {
  constructor(private httpService: HttpService, public bsModalRef: BsModalRef) {
    this.getAllProducts()
  }

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter()

  allProducts: any = []

  onClose() {
    this.bsModalRef.hide()
  }

  onAddToList(product:any) {
    // if(this.bsModalRef.content && typeof this.bsModalRef.content.handleButtonClick ==='function') {
    //   this.bsModalRef.content.handleButtonClick(product)
    // }
    this.buttonClicked.emit(product)
  }

  getAllProducts() {
    this.httpService.requestCall('purchase/getProducts', ApiMethod.POST)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.allProducts = response
        }
      })
  }
}
