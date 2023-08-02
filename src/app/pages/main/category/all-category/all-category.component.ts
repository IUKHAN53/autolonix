import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import Swal from 'sweetalert2';
import {SweetAlertOptions} from 'sweetalert2';
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";
import {Router} from "@angular/router";
import {StorageService} from "../../../../core/services/storage/storage.service";

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css']
})
export class AllCategoryComponent {
  constructor(private storage: StorageService, private httpService: HttpService, private router: Router) {
    this.getAllCategories()
    this.currentUser = this.storage.getUser()
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
      field: 'drilldown_id',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        deleteClick: (value: any) => {
          this.deleteCategory(value)
        },
        editClick: (value: any) => {
          this.router.navigate(['/category/edit', value])
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
  currentUser: any = {}
  currentPage: number = 0
  from: number = 0
  to: number = 0
  lastPage: number = 0
  perPage: number = 0
  total: number = 0
  errorMessage: string = ''

  onGridReady(params: GridReadyEvent) {
    this.getAllCategories()
  }

  getAllCategories(): void {
    this.httpService.requestCall('categories', ApiMethod.POST)
      .subscribe({
        next: (response) => {
          if (response) {
            this.allCategories = response
          }
        },
        error: (error) => {
          if (error.error.message) {
            this.errorMessage = error.error.message
          }
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000)
        },
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
            error: (error) => {
              if (error.error.message) {
                this.errorMessage = error.error.message
              }
              setTimeout(() => {
                this.errorMessage = ''
              }, 3000)
            },
            complete: () => console.log('Observer got a complete notification')
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }
}
