import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {ColDef, GridReadyEvent, RowModelType} from "ag-grid-community";
import {ImageCellRendererComponent} from "../../../../components/image-cell-renderer/image-cell-renderer.component";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";
import {
  CustomLoadingCellRenderer
} from "../../../../components/custom-loading-cell-renderer/custom-loading-cell-renderer.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent {
  allProducts: any = []
  currentPage: number = 0
  from: number = 0
  to: number = 0
  lastPage: number = 0
  perPage: number = 0
  total: number = 0

  constructor(private httpService: HttpService, private router: Router) {
    this.getAllProducts()
  }

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      headerName: 'Sl No',
      field: 'serialNumber',
      width: 120,
      cellRenderer: (params: any) => {
        const rowIndex = params.node.rowIndex;
        return rowIndex + 1;
      }
    },
    {headerName: 'Product Name', field: 'product_name'},
    {headerName: 'Product Code', field: 'product_code'},
    {headerName: 'Description', field: 'description'},
    {
      headerName: 'Category',
      field: 'category',
      cellRenderer: (params: any) => {
        const value = params.value
        return value ? value.drilldown_code : ''
      }
    },
    {headerName: 'Price', field: 'product_name'},
    {headerName: 'Cost', field: 'product_name'},
    {headerName: 'Image', cellRenderer: ImageCellRendererComponent},
    {
      headerName: 'Actions',
      cellRenderer: ActionCellRendererComponent,
      field: 'id',
      cellRendererParams: {
        deleteClick: (value: any) => {
          this.deleteProduct(value)
        },
        editClick: (value: any) => {
          this.router.navigate(['/product/edit', value])
        }
      }
    },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public loadingCellRenderer: any = CustomLoadingCellRenderer;
  public loadingCellRendererParams: any = {
    loadingMessage: 'One moment please...',
  };
  public loadingIndicator = {indicatorType: 'Shimmer'};
  public cacheBlockSize = 20;
  public maxBlocksInCache = 10;

  onGridReady(params: GridReadyEvent) {
    this.getAllProducts()
  }

  getAllProducts() {
    this.httpService.requestCall('products', ApiMethod.GET)
      .subscribe(
        response => {
          if (response) {
            this.allProducts = response
            // this.currentPage = response.current_page
            // this.from = response.from
            // this.to = response.to
            // this.lastPage = response.last_page
            // this.perPage = response.per_page
            // this.total = response.total
          }
        }
      )
  }

  getProductCategoryName(id: number): string {
    let name: string = ''
    this.httpService.requestCall('categories/' + id, ApiMethod.GET)
      .subscribe({
        next: response => {
          name = response.drilldown_code
        }
      })
    return name
  }

  deleteProduct(id: number): void {
    const options: SweetAlertOptions = {
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    };

    Swal.fire(options).then((result) => {
      if (result.isConfirmed) {
        this.httpService.requestCall('products/' + id, ApiMethod.DELETE)
          .subscribe({
            next: (response) => {
              Swal.fire('Success', 'Operation completed successfully!', 'success').then((result) => {
                this.getAllProducts()
              })
            },
            error: (error) => console.error(error),
            complete: () => console.log('Observer got a complete notification')
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }
}
