import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import Swal from 'sweetalert2';
import {SweetAlertOptions} from 'sweetalert2';
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css']
})
export class AllCategoryComponent {
  constructor(private httpService: HttpService) {
    this.getAllCategories()
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
          this.deleteCategory(value)
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

  allCategories: any = []
  currentPage: number = 0
  from: number = 0
  to: number = 0
  lastPage: number = 0
  perPage: number = 0
  total: number = 0

  onGridReady(params: GridReadyEvent) {
    this.getAllCategories()
  }

  getAllCategories(): void {
    this.httpService.requestCall('categories', ApiMethod.GET)
      .subscribe({
        next: (response) => {
          if (response) {
            this.allCategories = response
          }
        },
        error: (error) => console.error(error),
        complete: () => console.log('Observer got a complete notification')
      })
  }

  deleteCategory(id: number): void {
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
        this.httpService.requestCall('categories/' + id, ApiMethod.DELETE)
          .subscribe({
            next: (response) => {
              Swal.fire('Success', 'Operation completed successfully!', 'success').then((result) => {
                this.getAllCategories()
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
