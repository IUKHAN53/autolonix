import {Component} from '@angular/core';
import {StorageService} from "../../../../core/services/storage/storage.service";
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";
import {ApiMethod} from "../../../../core/services/const";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.css']
})
export class AllExpenseComponent {
  constructor(private storage: StorageService, private httpService: HttpService, private router: Router) {
    this.getAllInvoices()
    this.currentUser = this.storage.getUser()
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

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
      headerName: 'Purchase. No',
      field: 'account_code',
      flex: 1
    },
    {
      headerName: 'Supplier Name',
      field: 'account_name',
      flex: 1
    },
    {
      headerName: 'Date',
      field: 'telephone',
      flex: 1
    },
    {
      headerName: 'Amount',
      field: 'email',
      flex: 1
    },
    {
      headerName: 'Pay Mode',
      field: 'address',
      flex: 1
    },
    {
      headerName: 'Actions',
      field: 'id',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        deleteClick: (value: any) => {
          this.deleteInvoice(value)
        },
        editClick: (value: any) => {
          this.router.navigate(['/invoice/edit', value])
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

  allInvoices: any = []
  currentUser: any = {}
  currentPage: number = 0
  from: number = 0
  to: number = 0
  lastPage: number = 0
  perPage: number = 0
  total: number = 0

  onGridReady(params: GridReadyEvent) {
    this.getAllInvoices()
  }

  getAllInvoices() {
    this.httpService.requestCall('customers', ApiMethod.GET)
      .subscribe(
        response => {
          if (response) {
            this.allInvoices = response
          }
        }
      )
  }

  deleteInvoice(id: number): void {
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
        this.httpService.requestCall('customers/' + id, ApiMethod.DELETE)
          .subscribe({
            next: (response) => {
              Swal.fire('Success', 'Operation completed successfully!', 'success').then((result) => {
                this.getAllInvoices()
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

  searchReport(event: Event) {
    event.preventDefault()
  }
}