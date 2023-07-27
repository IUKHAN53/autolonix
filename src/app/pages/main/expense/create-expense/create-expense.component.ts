import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {
  ProductSelectionModalComponent
} from "../../../../components/product-selection-modal/product-selection-modal.component";
import {HttpService} from "../../../../core/services/http/http.service";
import {ApiMethod} from "../../../../core/services/const";
import {generateRandomKey} from "../../../../core/services/util/generateRandomKey";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent {

  constructor(private httpService: HttpService, private modalService: BsModalService) {
    this.getDropdowns()
  }

  purchaseModel: any = {
    purchase_no: '',
    purchase_date: '',
    supplier_id: '',
    supplier_invoice_no: '',
    payment_mode: '',
    account_head_id: '',
    purchase_note: '',
  }

  purchaseBottomModel: any = {
    total: 0,
    discount_rate: 0,
    discount_amount: 0,
    sub_total: 0,
    vat_rate: 0,
    vat_amount: 0,
    round_off_amount: 0,
    net_total: 0
  }

  activeTab = 'inventory'

  productList: any = []

  accountTabList: any = []

  bsModalRef: BsModalRef | undefined;

  allDropdowns: any = []
  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  invoiceModel: any = {}

  saveInvoice(event: Event) {
    event.preventDefault()
  }

  changeActiveTab(name: string, status: boolean) {
    if (!status) {
      this.errorMessage = 'Please fill all the required fields'
    } else {
      this.activeTab = name
    }
  }

  openModal() {
    const initialState = {}
    this.bsModalRef = this.modalService.show(ProductSelectionModalComponent, {
      initialState,
      class: 'modal-lg',
    });
    console.log(this.getPurchaseDetails('Credit'))
    this.bsModalRef.content.buttonClicked.subscribe({
      next: (data: any) => {
        this.handleAddToList(data)
      }
    })
  }

  handleAddToList(product: any) {
    const uniqueKey = generateRandomKey(11)
    const productDetail = {
      unique_key: uniqueKey,
      discount_percentage: 0,
      discount: 0,
      net_total: product.pack_qty * product.unit_price,
      ...product
    }
    this.productList.push(productDetail)
    this.updateBottomInputs()
    let supplier = this.filterSupplier(this.purchaseModel.supplier_id)
    if (supplier.length > 0) {
      this.handleSupplierChange(this.purchaseBottomModel.net_total)
      this.handlePayModeChange(this.purchaseBottomModel.total)
    }
    // this.doBottomCalculation()
  }

  updateBottomInputs() {
    if (this.productList.length > 0) {
      this.productList.map((item: any) => {
        this.purchaseBottomModel.total += item.net_total
        this.purchaseBottomModel.sub_total += item.net_total
        this.purchaseBottomModel.net_total += item.net_total
      })
    }
  }

  removeFromList(product: any) {
    this.productList = this.productList.filter((item: any) => item.unique_key !== product.unique_key)
  }

  handleInputChange(event: any, product: any, type: string) {
    const inputValue = event.target.value

    let newValues: any = null
    switch (type) {
      case 'pack_qty':
        newValues = this.doCalculation(inputValue, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'unit_price':
        newValues = this.doCalculation(product.pack_qty, inputValue, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'discount_percentage':
        newValues = this.doCalculation(product.pack_qty, product.unit_price, inputValue, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'discount_amount':
        newValues = this.doCalculation(product.pack_qty, product.unit_price, product.discount_percentage, inputValue, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'sub_total':
        newValues = this.doCalculation(product.pack_qty, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'ot_rate1':
        newValues = this.doCalculation(product.pack_qty, product.unit_price, product.discount_percentage, product.discount, inputValue, product.ot_amount1, product.net_total)
        break
      case 'ot_amount1':
        newValues = this.doCalculation(product.pack_qty, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, inputValue, product.net_total)
        break
      case 'net_total':
        newValues = this.doCalculation(product.pack_qty, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, inputValue)
        break
      default:
        break
    }
    Object.keys(newValues).forEach((key) => {
      const value = newValues[key];
      this.updateProductList(product, key, value)
    });
  }

  handleBottomInputChange(event: any, type: string) {
    const inputValue = event.target.value
    switch (type) {
      case 'total':
        this.doBottomCalculation(
          inputValue
          , this.purchaseBottomModel.discount_rate
          , this.purchaseBottomModel.discount_amount
          , this.purchaseBottomModel.sub_total
          , this.purchaseBottomModel.vat_rate
          , this.purchaseBottomModel.vat_amount
          , this.purchaseBottomModel.round_off_amount
          , this.purchaseBottomModel.net_total)
        break
      case 'discount_rate':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , inputValue
          , this.purchaseBottomModel.discount_amount
          , this.purchaseBottomModel.sub_total
          , this.purchaseBottomModel.vat_rate
          , this.purchaseBottomModel.vat_amount
          , this.purchaseBottomModel.round_off_amount
          , this.purchaseBottomModel.net_total)
        break
      case 'discount_amount':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , this.purchaseBottomModel.discount_rate
          , inputValue
          , this.purchaseBottomModel.sub_total
          , this.purchaseBottomModel.vat_rate
          , this.purchaseBottomModel.vat_amount
          , this.purchaseBottomModel.round_off_amount
          , this.purchaseBottomModel.net_total)
        break
      case 'sub_total':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , this.purchaseBottomModel.discount_rate
          , this.purchaseBottomModel.discount_amount
          , inputValue
          , this.purchaseBottomModel.vat_rate
          , this.purchaseBottomModel.vat_amount
          , this.purchaseBottomModel.round_off_amount
          , this.purchaseBottomModel.net_total)
        break
      case 'vat_rate':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , this.purchaseBottomModel.discount_rate
          , this.purchaseBottomModel.discount_amount
          , this.purchaseBottomModel.sub_total
          , inputValue
          , this.purchaseBottomModel.vat_amount
          , this.purchaseBottomModel.round_off_amount
          , this.purchaseBottomModel.net_total)

        let accountDetail = {
          accountID: this.allDropdowns.input_vat.account_id,
          accountName: this.allDropdowns.input_vat.ledger_name,
          debit: this.purchaseBottomModel.vat_amount,
          credit: 0,
          osBalance: 0,
          RStatusC: '',
          VoucherChildID: 0,
        }

        this.pushOrUpdateObject(this.accountTabList, accountDetail)
        break
      case 'vat_amount':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , this.purchaseBottomModel.discount_rate
          , this.purchaseBottomModel.discount_amount
          , this.purchaseBottomModel.sub_total
          , this.purchaseBottomModel.vat_rate
          , inputValue
          , this.purchaseBottomModel.round_off_amount
          , this.purchaseBottomModel.net_total)
        break
      case 'round_off_amount':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , this.purchaseBottomModel.discount_rate
          , this.purchaseBottomModel.discount_amount
          , this.purchaseBottomModel.sub_total
          , this.purchaseBottomModel.vat_rate
          , this.purchaseBottomModel.vat_amount
          , inputValue
          , this.purchaseBottomModel.net_total)
        break
      case 'net_total':
        this.doBottomCalculation(
          this.purchaseBottomModel.total
          , this.purchaseBottomModel.discount_rate
          , this.purchaseBottomModel.discount_amount
          , this.purchaseBottomModel.sub_total
          , this.purchaseBottomModel.vat_rate
          , this.purchaseBottomModel.vat_amount
          , this.purchaseBottomModel.round_off_amount
          , inputValue)
        break
      default:
        break
    }
  }

  pushOrUpdateObject(array: any, obj: any) {
    const index = array.findIndex((item: any) => item.accountID === obj.accountID);

    if (index === -1) {
      array.push(obj);
    } else {
      array[index] = obj;
    }
  }

  doBottomCalculation(total: any, discount_rate: any, discount_amount: any, sub_total: any, vat_rate: any, vat_amount: any, round_off_amount: any, net_total: any) {
    this.purchaseBottomModel.total = total
    this.purchaseBottomModel.discount_rate = discount_rate
    this.purchaseBottomModel.discount_amount = (total * discount_rate) / 100
    this.purchaseBottomModel.sub_total = this.purchaseBottomModel.total - this.purchaseBottomModel.discount_amount
    this.purchaseBottomModel.vat_rate = vat_rate
    this.purchaseBottomModel.vat_amount = (total * vat_rate) / 100
    let floorAmount = Math.floor(this.purchaseBottomModel.sub_total)
    floorAmount = floorAmount + round_off_amount
    this.purchaseBottomModel.net_total = floorAmount
  }

  updateProductList(findingObject: any, keyToUpdate: any, newValue: any) {
    const productExist = this.productList.find((obj: any) => obj.id === findingObject.id)
    if (productExist) {
      productExist[keyToUpdate] = newValue
    }
  }

  doCalculation(pack_qty: any, unit_price: any, discount_percentage: any, discount: any, ot_rate1: any, ot_amount1: any, net_total: any) {
    let amount_after_discount = (discount_percentage * unit_price) / 100
    let sub_total = (unit_price * pack_qty) - amount_after_discount
    let ot_amount = (unit_price * ot_rate1) / 100
    let total = sub_total + ot_amount

    return {
      pack_qty,
      unit_price,
      discount_percentage,
      discount: amount_after_discount,
      sub_total,
      ot_rate1,
      ot_amount1: ot_amount,
      net_total: total
    }
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

  getPurchaseDetails(title: string) {
    return this.allDropdowns.purchase_account.filter(function (d: any) {
      if (title === 'Credit') {
        return d.id === 32
      } else {
        return d.id === 31
      }
    });
  }

  handleSupplierChange(credit:any) {
    let supplier = this.filterSupplier(this.purchaseModel.supplier_id)
    if (supplier.length > 0) {
      let details = {
        accountID: supplier[0].parent_account_id,
        accountName: supplier[0].account_name,
        debit: 0,
        credit: credit,
        osBalance: 0,
        RStatusC: '',
        VoucherChildID: 0,
      }
      this.pushOrUpdateObject(this.accountTabList, details)
    }
  }

  filterSupplier(id: any) {
    return this.allDropdowns.suppliers.filter(function (d: any) {
      return d.id === parseInt(id);
    });
  }

  handlePayModeChange(debit:any) {
    let payModeDetail = this.getPurchaseDetails(this.purchaseModel.pay_mode)
    if (payModeDetail.length > 0) {
      let details = {
        accountID: payModeDetail[0].account_id,
        accountName: payModeDetail[0].ledger_name,
        debit: debit,
        credit: 0,
        osBalance: 0,
        RStatusC: '',
        VoucherChildID: 0,
      }
      this.pushOrUpdateObject(this.accountTabList, details)
    }
  }
}
