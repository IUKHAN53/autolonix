import {Component} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActionCellRendererComponent} from "../../../../components/action-cell-renderer/action-cell-renderer.component";
import {
  CustomLoadingCellRenderer
} from "../../../../components/custom-loading-cell-renderer/custom-loading-cell-renderer.component";
import {ApiMethod} from "../../../../core/services/const";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-all-sub-sub-category',
  templateUrl: './all-sub-sub-category.component.html',
  styleUrls: ['./all-sub-sub-category.component.css']
})
export class AllSubSubCategoryComponent {
  constructor(private httpService: HttpService, private router: Router) {
    this.getDropdowns()
    this.getSubSubCategories()
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
      headerName: 'Sub Sub Category Code',
      field: 'drilldown_code',
      flex: 1
    },
    {
      headerName: 'Sub Sub Category Description',
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
          this.router.navigate(['/sub-sub-category/edit', value])
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
  allSubSubCategories: any = []
  allCategories: any = []
  parent_id: number = 0
  sub_parent_id: number = 0

  onGridReady(params: GridReadyEvent) {
    this.getSubSubCategories()
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

  getSubCategories(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: selectedValue})
      .subscribe({
        next: (response) => {
          console.log(response)
          this.allSubCategories = response
        },
        error: (error) => console.error(error.error),
        complete: () => console.log('Observer got a complete notification')
      })
  }


  getSubSubCategories() {
    this.httpService.requestCall('subcategories', ApiMethod.POST, {parent_id: this.sub_parent_id})
      .subscribe({
        next: (response) => {
          console.log(response)
          this.allSubSubCategories = response
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
                this.getSubSubCategories()
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
