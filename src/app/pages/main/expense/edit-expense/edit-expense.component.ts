import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiMethod, AppConfig} from "../../../../core/services/const";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  ProductSelectionModalComponent
} from "../../../../components/product-selection-modal/product-selection-modal.component";
import {UtilService} from "../../../../core/services/util/util.service";
import {generateRandomKey} from "../../../../core/services/util/generateRandomKey";

interface bottomModel  {
  total: number,
  discount_rate: number,
  discount_amount: number,
  sub_total: number,
  vat_rate: number,
  vat_amount: number,
  round_off_amount: number,
  net_total: number,
  voucher_amount: number
}

interface topModel {
  purchase_no: string,
  purchase_date: string,
  supplier_id: string,
  supplier_invoice_no: string,
  payment_mode: string,
  account_head_id: string,
  purchase_note: string,
}

interface productModel {
  product_id: number,
  product_code: string,
  product_name: string,
  unique_id: number,
  quantity: string,
  unit_price: string,
  discount: string,
  sub_total: string,
  ot_rate1: string,
  ot_amount1: string,
  net_total: string,
  discount_percentage: string,
  pack_qty: string,
  unit: string,
  pack_details: string,
}

interface accountModel {
  id: number,
  accountID: number,
  accountName: string,
  debit: number | 0,
  credit: number | 0,
  osBalance: number | 0,
  RStatusC: string | 'Active',
  VoucherChildID: number | 0,
}
@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit{

  constructor(private modalService: BsModalService, private utilService: UtilService, private httpService: HttpService, private router: Router, private route: ActivatedRoute) {
    this.getDropdowns()
  }

  purchaseId: any = null
  ngOnInit(): void {
    this.purchaseId =  this.route.snapshot.paramMap.get('id')
    if(this.purchaseId) {
      this.getPurchaseEditDetails()
    }
  }

  purchaseModel: topModel = {
    purchase_no: '',
    purchase_date: '',
    supplier_id: '',
    supplier_invoice_no: '',
    payment_mode: '',
    account_head_id: '',
    purchase_note: '',
  }

  purchaseBottomModel: bottomModel = {
    total: 0,
    discount_rate: 0,
    discount_amount: 0,
    sub_total: 0,
    vat_rate: 0,
    vat_amount: 0,
    round_off_amount: 0,
    net_total: 0,
    voucher_amount: 0
  }

  activeTab = 'inventory'

  productList: productModel[] = []

  accountTabList: accountModel[] = []

  bsModalRef: BsModalRef | undefined;

  allDropdowns: any = []
  loading: boolean = false
  errorMessage: string = ''
  errors: any = {}

  invoiceModel: any = {}

  updatePurchase() {
  }

  getPurchaseEditDetails() {
    this.loading = true
    this.httpService.requestCall('purchase/edit/' + this.purchaseId, ApiMethod.GET)
      .subscribe({
        next: data => {
          this.loading = false
          this.purchaseModel = data.top
          this.purchaseModel.purchase_date = this.utilService.formatDate(new Date(data.top.purchase_date))
          this.purchaseBottomModel = data.bottom
          this.productList = data.products
          this.accountTabList = data.accounts
          console.log(this.purchaseModel)
          this.updateBottomInputs()
        }
      })
  }

  changeActiveTab(name: string, status: boolean) {
    if (!status) {
      this.errorMessage = 'Please fill all head first fields and select a product'
    } else {
      this.activeTab = name
    }
  }

  openModal() {
    if (this.utilService.areAllValuesNullOrZeroOrEmptyString(this.purchaseModel)) {
      this.errorMessage = "Please fill the head first"
      window.screenTop
    } else {
      const initialState = {}
      this.bsModalRef = this.modalService.show(ProductSelectionModalComponent, {
        initialState,
        class: 'modal-lg',
      });

      this.bsModalRef.content.buttonClicked.subscribe({
        next: (data: any) => {
          this.handleAddToList(data)
        }
      })
    }
  }

  handleAddToList(product: any) {
    const uniqueKey = generateRandomKey(11)
    const productDetail = {
      unique_key: uniqueKey,
      discount_percentage: 0,
      discount: 0,
      quantity: 1,
      sub_total: product.unit_price,
      net_total: product.unit_price,
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
    let total: any = 0
    let sub_total: any = 0
    let net_total: any = 0
    if (this.productList.length > 0) {
      this.productList.map((item: any) => {
        total += parseFloat(item.net_total)
        sub_total += parseFloat(item.net_total)
        net_total += parseFloat(item.net_total)
      })
    }

    this.purchaseBottomModel.total = total.toFixed(AppConfig.DECIMAL_POINTS)
    this.purchaseBottomModel.sub_total = sub_total.toFixed(AppConfig.DECIMAL_POINTS)
    this.purchaseBottomModel.net_total = net_total.toFixed(AppConfig.DECIMAL_POINTS)
  }

  removeFromList(product: any) {
    this.productList = this.productList.filter((item: any) => item.unique_key !== product.unique_key)
    this.updateBottomInputs()
  }

  handleInputChange(event: any, product: any, type: string) {
    const inputValue = event.target.value

    let newValues: any = null
    switch (type) {
      case 'pack_qty':
        newValues = this.doCalculation(inputValue, product.quantity, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'quantity':
        newValues = this.doCalculation(product.pack_qty, inputValue, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'unit_price':
        newValues = this.doCalculation(product.pack_qty, product.quantity, inputValue, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'discount_percentage':
        newValues = this.doCalculation(product.pack_qty, product.quantity, product.unit_price, inputValue, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'discount_amount':
        newValues = this.doCalculation(product.pack_qty, product.quantity, product.unit_price, product.discount_percentage, inputValue, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'sub_total':
        newValues = this.doCalculation(product.pack_qty, product.quantity, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, product.net_total)
        break
      case 'ot_rate1':
        newValues = this.doCalculation(product.pack_qty, product.quantity, product.unit_price, product.discount_percentage, product.discount, inputValue, product.ot_amount1, product.net_total)
        break
      case 'ot_amount1':
        newValues = this.doCalculation(product.pack_qty, product.quantity, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, inputValue, product.net_total)
        break
      case 'net_total':
        newValues = this.doCalculation(product.pack_qty, product.quantity, product.unit_price, product.discount_percentage, product.discount, product.ot_rate1, product.ot_amount1, inputValue)
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

        let accountDetail1 = {
          id: this.allDropdowns.discount.id,
          accountID: this.allDropdowns.discount.account_id,
          accountName: this.allDropdowns.discount.ledger_name,
          debit: 0,
          credit: this.purchaseBottomModel.discount_amount,
          osBalance: 0,
          RStatusC: '',
          VoucherChildID: 0,
        }

        this.pushOrUpdateObject(this.accountTabList, accountDetail1)

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
          id: this.allDropdowns.input_vat.id,
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

        let accountDetail2 = {
          id: this.allDropdowns.round_off_adjustment.id,
          accountID: this.allDropdowns.round_off_adjustment.account_id,
          accountName: this.allDropdowns.round_off_adjustment.ledger_name,
          debit: 0,
          credit: inputValue,
          osBalance: 0,
          RStatusC: '',
          VoucherChildID: 0,
        }

        this.pushOrUpdateObject(this.accountTabList, accountDetail2)
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
    const index = array.findIndex((item: any) => item.accountID === obj.accountID && item.id === obj.id);
    console.log(array, obj, index)
    if (index === -1) {
      array.push(obj);
    } else {
      array[index] = obj;
    }
  }

  updateAccountTable() {

  }

  doBottomCalculation(total: any, discount_rate: any, discount_amount: any, sub_total: any, vat_rate: any, vat_amount: any, round_off_amount: any, net_total: any) {
    this.purchaseBottomModel.total = parseFloat(parseFloat(total).toFixed(AppConfig.DECIMAL_POINTS))
    this.purchaseBottomModel.discount_rate = discount_rate
    let discount = (parseFloat(total) * discount_rate) / 100
    this.purchaseBottomModel.discount_amount = parseFloat(discount.toFixed(AppConfig.DECIMAL_POINTS))

    let subTotal = total - discount
    this.purchaseBottomModel.sub_total = parseFloat(subTotal.toFixed(AppConfig.DECIMAL_POINTS))

    this.purchaseBottomModel.vat_rate = vat_rate
    this.purchaseBottomModel.vat_amount = (total * vat_rate) / 100
    let floorAmount: any = Math.floor(subTotal)
    floorAmount = floorAmount + round_off_amount
    this.purchaseBottomModel.net_total = parseFloat(parseFloat(floorAmount).toFixed(AppConfig.DECIMAL_POINTS))
    this.purchaseBottomModel.voucher_amount = this.accountTabList.reduce((accumulator: any, currentObject: any) => accumulator + parseFloat(currentObject.credit), 0);
  }

  updateProductList(findingObject: any, keyToUpdate: any, newValue: productModel) {
    const productExist:productModel | undefined = this.productList.find((obj: any) => obj.id === findingObject.id)
    if (productExist) {
      // @ts-ignore
      productExist[keyToUpdate] = newValue
    }
  }

  doCalculation(pack_qty: any, quantity: any, unit_price: any, discount_percentage: any, discount: any, ot_rate1: any, ot_amount1: any, net_total: any) {
    let amount_after_discount = (discount_percentage * unit_price) / 100
    let sub_total = (unit_price * quantity) - amount_after_discount
    let ot_amount = (unit_price * ot_rate1) / 100
    let total = sub_total + ot_amount

    return {
      pack_qty,
      quantity,
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

  handleSupplierChange(credit: any) {
    let supplier = this.filterSupplier(this.purchaseModel.supplier_id)
    if (supplier.length > 0) {
      let details = {
        id: supplier[0].id,
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

  handlePayModeChange(debit: any) {
    let payModeDetail = this.getPurchaseDetails(this.purchaseModel.payment_mode)
    if (payModeDetail.length > 0) {
      let details = {
        id: payModeDetail[0].id,
        accountID: payModeDetail[0].account_id,
        accountName: payModeDetail[0].ledger_name,
        debit: debit,
        credit: 0,
        osBalance: 0,
        RStatusC: '',
        VoucherChildID: 0,
      }
      this.pushOrUpdateObject(this.accountTabList, details)
      // console.log(this.accountTabList, details)
    }
  }
}
