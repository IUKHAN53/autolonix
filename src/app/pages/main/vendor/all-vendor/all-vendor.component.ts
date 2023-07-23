import { Component } from '@angular/core';
import {StorageService} from "../../../../core/services/storage/storage.service";
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";
import {ApiMethod} from "../../../../core/services/const";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-all-vendor',
  templateUrl: './all-vendor.component.html',
  styleUrls: ['./all-vendor.component.css']
})
export class AllVendorComponent {
  constructor(private storage: StorageService, private httpService: HttpService, private router: Router) {
    this.getAllCustomers()
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
      headerName: 'Code',
      field: 'account_code',
      flex: 1
    },
    {
      headerName: 'Vendor Name',
      field: 'account_name',
      flex: 1
    },
    {
      headerName: 'Telephone',
      field: 'telephone',
      flex: 1
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1
    },
    {
      headerName: 'Address',
      field: 'address',
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
          this.router.navigate(['/vendor/edit', value])
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

  allCustomers: any = []
  currentUser: any = {}
  currentPage: number = 0
  from: number = 0
  to: number = 0
  lastPage: number = 0
  perPage: number = 0
  total: number = 0
  errorMessage: string = ''
  onGridReady(params: GridReadyEvent) {
    this.getAllCustomers()
  }

  getAllCustomers() {
    this.httpService.requestCall('account-head', ApiMethod.POST, {type: 'supplier'})
      .subscribe(
        response => {
          if (response) {
            this.allCustomers = response
          }
        }
      )
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
        this.httpService.requestCall('account-head/' + id, ApiMethod.DELETE)
          .subscribe({
            next: (response) => {
              Swal.fire('Success', 'Operation completed successfully!', 'success').then((result) => {
                this.getAllCustomers()
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
