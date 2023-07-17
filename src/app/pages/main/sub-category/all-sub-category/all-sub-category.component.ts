import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";
import {
  CustomLoadingCellRenderer
} from "../../../../components/custom-loading-cell-renderer/custom-loading-cell-renderer.component";

@Component({
  selector: 'app-all-sub-category',
  templateUrl: './all-sub-category.component.html',
  styleUrls: ['./all-sub-category.component.css']
})
export class AllSubCategoryComponent {
  constructor(private httpService: HttpService) {
    this.getDropdowns()
    this.getAllSubCategories()
  }

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
    {
      headerName: 'Category Code',
      field: 'drilldown_code',
      flex: 1
    },
    {
      headerName: 'Category Description',
      field: 'drilldown_description',
      flex: 1
    },
    {
      headerName: 'Actions',
      field: 'id',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        deleteClick: (value: any) => {
          this.deleteSubCategory(value)
        },
        editClick: (value: any) => {
          alert(value)
        }
      },
      sortable: false,
      filter: false,
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

  allSubCategories: any = []
  allCategories: any = []
  parent_id: number = 0
  currentPage: number = 0
  from: number = 0
  to: number = 0
  lastPage: number = 0
  perPage: number = 0
  total: number = 0

  onGridReady(params: GridReadyEvent) {
    this.getAllSubCategories()
  }

  getDropdowns(): void {
    this.httpService.requestCall('products/create', ApiMethod.GET)
      .subscribe({
        next: (data) => {
          this.allCategories = data.categories
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  getAllSubCategories(): void {
    this.httpService.requestCall('subcategories', ApiMethod.POST)
      .subscribe({
        next: (response) => {
          this.allSubCategories = response.data
          this.currentPage = response.current_page
          this.from = response.from
          this.to = response.to
          this.lastPage = response.last_page
          this.perPage = response.per_page
          this.total = response.total
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  getChildCategories(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: selectedValue})
      .subscribe({
        next: (response) => {
          this.allSubCategories = response.data
          this.currentPage = response.current_page
          this.from = response.from
          this.to = response.to
          this.lastPage = response.last_page
          this.perPage = response.per_page
          this.total = response.total
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  deleteSubCategory(id: number): void {
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
        this.httpService.requestCall('subcategories/' + id, ApiMethod.DELETE)
          .subscribe({
            next: (response) => {
              Swal.fire('Success', 'Operation completed successfully!', 'success').then((result) => {
                this.getAllSubCategories()
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
