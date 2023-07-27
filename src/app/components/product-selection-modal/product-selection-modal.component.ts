import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {HttpService} from "../../core/services/http/http.service";
import {ApiMethod} from "../../core/services/const";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {ColumnMode} from "./colum-mode.type";
import {SortDirection} from "./sort-direction.type";
import {SortType} from "./sort.type";

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
  // @ts-ignore
  @ViewChild(DatatableComponent) table: DatatableComponent;

  allProducts: any = []

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  rowsPerPage = 10;
  currentPage = 1;
  totalRows = this.allProducts.length;
  SortType = SortType;
  ColumnMode = ColumnMode;
  SortDirection = SortDirection;

  onClose() {
    this.bsModalRef.hide()
  }

  onAddToList(product: any) {
    this.buttonClicked.emit(product)
  }

  getAllProducts() {
    this.loading = true
    this.httpService.requestCall('purchase/getProducts', ApiMethod.POST)
      .subscribe({
        next: (response) => {
          this.loading = false
          this.allProducts = response
        },
        error: (error) => {
          this.loading = false
          console.error(error.error)
        }
      })
  }

  handleSearch(event: any) {
    const val = event.target.value.toLowerCase();
    if (val === '') {
      this.getAllProducts()
    } else {
      this.getAllProducts()
      this.allProducts = this.allProducts.filter(function (d: any) {
        return (d.product_name && d.product_name.toLowerCase().indexOf(val) !== -1)
          || (d.description && d.description.toLowerCase().indexOf(val) !== -1)
          || (d.pack_details && d.pack_details.toLowerCase().indexOf(val) !== -1)
          || (d.unit_price && d.unit_price.toLowerCase().indexOf(val) !== -1)
          || !val;
      });
      this.table.offset = 0;
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.offset + 1;
  }
}
