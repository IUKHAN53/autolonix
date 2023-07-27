<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccountHeadMaster;
use App\Models\AccountsParameter;
use App\Models\ProductChildPrice;
use App\Models\ProductMaster;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function getDetails(Request $request)
    {
        if ($request->type == 'sale') {
            $data = [
                'customers' => AccountHeadMaster::query()->where('parent_account_id', getCustomerAccountId())->get()->toArray(),
                'payment_modes' => salesPaymentMode(),
                'invoice_parties' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
                'account_heads' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
                'sales_man' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
                'purchase_account' => AccountsParameter::query()->where('ledger_name', 'Purchase Acc')->get()->toArray(),
                'input_vat' => AccountsParameter::query()->where('ledger_name', 'INPUT VAT 5%')->first()->toArray(),
                'discount' => AccountsParameter::query()->where('ledger_name', 'DISCOUNT RECEIVED')->first()->toArray(),
            ];
        } else {
            $data = [
                'suppliers' => AccountHeadMaster::query()->where('parent_account_id', getSupplierAccountId())->get()->toArray(),
                'payment_modes' => purchasePaymentMode(),
                'account_heads' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
                'purchase_account' => AccountsParameter::query()->where('ledger_name', 'Purchase Acc')->get()->toArray(),
                'input_vat' => AccountsParameter::query()->where('ledger_name', 'INPUT VAT 5%')->first()->toArray(),
                'discount' => AccountsParameter::query()->where('ledger_name', 'DISCOUNT RECEIVED')->first()->toArray(),
            ];
        }
        return response()->json($data);
    }

    public function getProducts(Request $request)
    {
        $data = ProductMaster::query()
            ->join('product_child_prices', 'product_child_prices.product_id', '=', 'product_masters.id')
            ->join('product_child', 'product_child.id', '=', 'product_masters.id')
            ->select('product_masters.*', 'product_child.*', 'product_child_prices.*')
            ->get()->toArray();
        return response()->json($data);
    }

    public function index()
    {
        return response()->json(['message' => 'Hello World!']);
    }

    public function storeExpense(Request $request){
        return response()->json($request->all());
    }
}
