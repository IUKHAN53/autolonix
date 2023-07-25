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
                'customers' => AccountHeadMaster::query()->where('parent_account_id', getCustomerAccountId())->pluck('account_name', 'id')->toArray(),
                'payment_modes' => salesPaymentMode(),
                'invoice_parties' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
                'account_heads' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
                'sales_man' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
            ];
        } else {
            $data = [
                'suppliers' => AccountHeadMaster::query()->where('parent_account_id', getSupplierAccountId())->pluck('account_name', 'id')->toArray(),
                'payment_modes' => purchasePaymentMode(),
                'account_heads' => AccountHeadMaster::query()->pluck('account_name', 'id')->toArray(),
            ];
        }
        return response()->json($data);
    }

    public function getProducts(Request $request)
    {
        $data = ProductMaster::query()->join('product_child_prices', 'product_child_prices.product_id', '=', 'product_masters.id')
            ->select('product_masters.product_name as product_name', 'product_masters.description as description', 'product_masters.pack_details as pack_details', 'product_child_prices.unit_price as unit_price')
            ->get()->toArray();
        return response()->json($data);
    }

    public function index()
    {
        return response()->json(['message' => 'Hello World!']);
    }
}
