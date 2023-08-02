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
    this.getAllPurchases()
    this.getDropdowns()
    this.currentUser = this.storage.getUser()
  }

  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  searchParams: any = {
    from_date: null,
    to_date: null,
    supplier_id: null,
    payment_mode: null,
    invoice_no: null,
  }

  allDropdowns: any = []

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
      field: 'purchase_no',
      flex: 1
    },
    {
      headerName: 'Supplier Name',
      field: 'supplier.account_name',
      flex: 1
    },
    {
      headerName: 'Date',
      field: 'purchase_date',
      flex: 1
    },
    {
      headerName: 'Amount',
      field: 'total_amount',
      flex: 1
    },
    {
      headerName: 'Pay Mode',
      field: 'payment_mode',
      flex: 1
    },
    {
      headerName: 'Actions',
      field: 'purchase_id',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        deleteClick: (value: any) => {
          this.deletePurchase(value)
        },
        editClick: (value: any) => {
          this.router.navigate(['/expense/edit', value])
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

  allPurchases: any = []
  currentUser: any = {}

  onGridReady(params: GridReadyEvent) {
    this.getAllPurchases()
  }

  getAllPurchases() {
    this.httpService.requestCall('purchase', ApiMethod.POST, this.searchParams)
      .subscribe(
        response => {
          if (response) {
            console.log(response)
            this.allPurchases = response
          }
        }
      )
  }

  getDropdowns() {
    this.httpService.requestCall('purchase/getDetails', ApiMethod.POST)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.allDropdowns = response
        }
      })
  }

  deletePurchase(id: number): void {
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
                this.getAllPurchases()
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
    this.getAllPurchases()
  }

  clearParams() {
    this.searchParams = {
      from_date: null,
      to_date: null,
      supplier_id: null,
      payment_mode: null,
      invoice_no: null,
    }
    this.getAllPurchases()
  }
}
