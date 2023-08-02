<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccountHeadMaster;
use App\Models\AccountsParameter;
use App\Models\InventoryTransMaster;
use App\Models\ProductChildPrice;
use App\Models\ProductMaster;
use App\Models\PurchaseChild;
use App\Models\PurchaseMaster;
use App\Models\VoucherChild;
use App\Models\VoucherMaster;
use App\Models\VoucherTypeMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{

    public function index(Request $request)
    {
        $purchase_masters = PurchaseMaster::query()->with('supplier');

        $purchase_masters = $purchase_masters
            ->when($request->from_date, function ($query) use ($request) {
                $query->where('purchase_date', '>=', $request->from_date);
            });
        $purchase_masters = $purchase_masters
            ->when($request->to_date, function ($query) use ($request) {
                $query->where('purchase_date', '<=', $request->to_date);
            });
        $purchase_masters = $purchase_masters->when($request->supplier_id, function ($query) use ($request) {
            $query->where('supplier_id', $request->supplier_id);
        });
        $purchase_masters = $purchase_masters->when($request->payment_mode, function ($query) use ($request) {
            $query->where('payment_mode', $request->payment_mode);
        });
        $purchase_masters = $purchase_masters->when($request->invoice_number, function ($query) use ($request) {
            $query->where('purchase_no', $request->invoice_number);
        });

        return response()->json($purchase_masters->get());
    }


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
                'account_heads' => AccountHeadMaster::query()
                    ->where('posting_allowed', 1)
                    ->where('account_no', 'LIKE', '03-02%')
                    ->where('account_id', '>', 100)
                    ->pluck('account_name', 'account_id')
                    ->toArray(),
                'purchase_account' => AccountsParameter::query()
                    ->whereIn('parameter_name', ['PurchaseDRLedgerCash', 'PurchaseDRLedgerCredit'])
                    ->get()
                    ->toArray(),
                'input_vat' => AccountsParameter::query()->where('parameter_name', 'INPutTax5%')->first()->toArray(),
                'discount' => AccountsParameter::query()->where('parameter_name', 'PurchaseCRDiscountLedger')->first()->toArray(),
                'round_off_adjustment' => AccountsParameter::query()->where('parameter_name', 'PurchaseCRRoundingLedger')->first()->toArray(),
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

    public function storePurchase(Request $request)
    {
        DB::beginTransaction();
        try {
            $purchase_master = $this->addPurchaseMaster($request);
            foreach ($request->products as $product) {
                $purchase_child_id = getMaxId('purchase_child', 'purchase_child_id');
                $purchase_child = $this->addPurchaseChild($product, $purchase_master, $purchase_child_id);
                $inventory_id = getMaxId('inventory_trans_master', 'inventory_trans_master_id');
                $this->addInventoryTransMaster($purchase_master, $purchase_child, $inventory_id);
            }
            $voucher_master_parent_id = getMaxId('voucher_master', 'voucher_master_id');
            $voucher_master = $this->addVoucherMaster($request, $voucher_master_parent_id, $purchase_master);
            foreach ($request->accounts as $account) {
                $voucher_child_id = getMaxId('voucher_child', 'voucher_child_id');
                $this->addVoucherChild($account, $voucher_child_id, $voucher_master, $purchase_master);
            }
            if (strtolower($request->payment_mode) == 'cash') {
                $cash_voucher_master_id = getMaxId('voucher_master', 'voucher_master_id');
                $cash_voucher_master = $this->addVoucherMaster($request, $cash_voucher_master_id, $purchase_master, true, $voucher_master_parent_id);
                $this->generateVoucherChild($request, $purchase_master, $cash_voucher_master);
            }
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json($exception->getMessage());
        }
        return response()->json(['message' => 'success']);
    }

    public function editPurchase(Request $request, $id)
    {
        $purchase_master = PurchaseMaster::query()->where('purchase_id', $id)->first();
        $purchase_child = $purchase_master->purchase_child;
        $voucher_master = $purchase_master->voucher_master;
        $account_head_id = $voucher_master->voucher_child()->where('cr_amount', $purchase_master->net_amount)->first()->voucher_master_id;
        $voucher_child = $voucher_master->voucher_child;
        $inventory_trans_master = $purchase_master->inventory_trans_master;

        $data = [];
        $top = [
            'supplier_invoice_no' => $purchase_master->supplier_ref_no,
            'purchase_date' => $purchase_master->purchase_date,
            'supplier_id' => $purchase_master->supplier_id,
            'payment_mode' => $purchase_master->payment_mode,
            'purchase_note' => $purchase_master->purchase_note,
            'account_head_id' => $account_head_id,
            'purchase_no' => $purchase_master->purchase_no,
        ];
        $bottom = [
            'discount_amount' => $purchase_master->discount_amount_m,
            'sub_total' => $purchase_master->sub_total_m,
            'vat_rate' => $purchase_master->input_tax1_rate_m,
            'vat_amount' => $purchase_master->input_tax1_amount_m,
            'round_off_amount' => $purchase_master->round_off_adj,
            'net_total' => $purchase_master->net_amount,
        ];
        $products = [];
        foreach ($purchase_child as $product) {
            $products[] = [
                'purchase_child_id' => $purchase_child->purchase_child_id,
                'product_id' => $product->product_id,
                'product_code' => $product->product_code,
                'product_name' => $product->product_name,
                'unique_id' => $product->unique_id,
                'quantity' => $product->qty,
                'unit_price' => $product->unit_cost,
                'discount' => $product->discount_amount_c,
                'sub_total' => $product->sub_total_c,
                'ot_rate1' => $product->input_tax1_rate_c,
                'ot_amount1' => $product->input_tax1_amount_c,
                'net_total' => $product->line_total,
                'discount_percentage' => '',
                'pack_qty' => $product->pack_qty,
                'unit' => '',
                'pack_details' => ''
            ];
        }
        $accounts = [];
        foreach ($voucher_child as $account) {
            $accounts[] = [
                'id' => $account->id,
                'voucher_child_id' => $voucher_child->voucher_child_id,
                'accountID' => $account->account_id,
                'accountName' => AccountsParameter::query()->where('account_id', $account->account_id)->first()->ledger_name,
                'credit' => $account->cr_amount,
                'debit' => $account->dr_amount,
                'osBalance' => $account->os_balance,
            ];
        }

        $data['top'] = $top;
        $data['bottom'] = $bottom;
        $data['products'] = $products;
        $data['accounts'] = $accounts;

        return response()->json($data);

    }

    public function updatePurchase(Request $request)
    {
        DB::beginTransaction();
        try {
            $purchase_master = $this->addPurchaseMaster($request->purchase_master_id);
            foreach ($request->products as $product) {
                $product = (object)$product;
                $purchase_child_id = $request->purchase_child_id;
                $this->addPurchaseChild($product, $purchase_master, $purchase_child_id);
            }
            $inventory_id = getMaxId('inventory_trans_master', 'inventory_trans_master_id');
            $this->addInventoryTransMaster($request, $inventory_id);
            $voucher_master_id = getMaxId('voucher_master', 'voucher_master_id');
            $this->addVoucherMaster($request, $voucher_master_id);
            $voucher_child_id = getMaxId('voucher_child', 'voucher_child_id');
            $this->addVoucherChild($request, $voucher_child_id);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json($exception->getMessage());
        }
        return response()->json(['message' => 'success']);
    }



    public function addPurchaseMaster(Request $request, $purchase_id = null)
    {
        $p_no = getMaxId('purchase_master', 'purchase_no',
            [
                'column' => 'transaction_type',
                'value' => 'PURCHASE',
                'operator' => '='
            ],
            [
                'column' => 'station_id',
                'value' => getStationId(),
                'operator' => '='
            ]
        );
        return PurchaseMaster::updateOrCreate(
            [
                'purchase_id' => $request->purchase_id
            ], [
            'purchase_id' => (PurchaseMaster::max('purchase_id') != null ? PurchaseMaster::max('purchase_id') + 1 : 1),
            'purchase_no' => $p_no != null ? $p_no + 1 : 1,
            'transaction_type' => 'PURCHASE',
            'prefix' => '',
            'supplier_ref_no' => $request->top['supplier_invoice_no'],
            'purchase_date' => $request->top['purchase_date'],
            'supplier_id' => $request->top['supplier_id'],
            'payment_mode' => $request->top['payment_mode'],
            'discount_amount_m' => $request->bottom['discount_amount'],
            'sub_total_m' => $request->bottom['sub_total'],
            'non_taxable_amount' => 0,
            'input_tax1_rate_m' => $request->bottom['vat_rate'],
            'input_tax1_amount_m' => $request->bottom['vat_amount'],
            'input_tax2_rate_m' => 0,
            'input_tax2_amount_m' => 0,
            'input_tax3_rate_m' => 0,
            'input_tax3_amount_m' => 0,
            'input_tax4_rate_m' => 0,
            'input_tax4_amount_m' => 0,
            'input_tax5_rate_m' => 0,
            'input_tax5_amount_m' => 0,
            'total_amount' => $request->bottom['sub_total'] + $request->bottom['vat_amount'],
            'round_off_adj' => $request->bottom['round_off_amount'],
            'net_amount' => $request->bottom['net_total'],
            'post_status' => 'NOT POSTED',
            'received_by_id' => 0,
            'staff_id' => auth()->user()->id,
            'counter_close_status' => 'PENDING',
            'server_status' => 'PENDING',
            'remarks' => $request->top['purchase_note'] ?? '',
            'purchase_type' => 'LOCAL PURCHASE',
            'currency_id' => 0,
            'currency_rate' => 0,
            'container_no' => 0,
            'port' => 0,
            'tax_group_id' => 0,
            'bol' => 0,
            'clearing_agent' => 0,
            'shipping_method' => 0,
            'sub_total_fc' => 0,
            'discount_amount_fc' => 0,
            'round_off_adjustment_fc' => 0,
            'invoice_amount_fc' => 0,
            'additional_charges' => 0,
            'net_vat' => 0,
            'gross_amount_aed' => 0,
            'items_total_bc' => 0,
            'station_id' => getStationId(),
        ]);
    }

    public function addPurchaseChild($product, $purchase_master, $purchase_child_id)
    {
        $product_master = ProductMaster::query()->where('product_id', $product['product_id'])->first();

        return PurchaseChild::updateOrCreate(
            [
                'purchase_child_id' => $purchase_child_id,
                'purchase_id' => $purchase_master->purchase_id,
            ], [
            'product_id' => $product['product_id'],
            'product_code' => $product['product_code'],
            'product_name' => $product['product_name'],
            'product_name_arabic' => '',
            'unique_id' => $product_master->unique_id ?? $product['product_id'],
            'foc_qty' => 0,
            'qty' => $product['quantity'] ?? 0,
            'pack_qty' => $product_master->pack_qty ?? 1,
            'unit_cost' => $product['unit_price'],
            'discount_amount_c' => $product['discount'],
            'sub_total_c' => $product['sub_total'],
            'non_taxable_amount_c' => 0,
            'input_tax1_rate_c' => $product['ot_rate1'],
            'input_tax1_amount_c' => $product['ot_amount1'],
            'input_tax2_rate_c' => 0,
            'input_tax2_amount_c' => 0,
            'input_tax3_rate_c' => 0,
            'input_tax3_amount_c' => 0,
            'input_tax4_rate_c' => 0,
            'input_tax4_amount_c' => 0,
            'input_tax5_rate_c' => 0,
            'input_tax5_amount_c' => 0,
            'line_total' => $product['net_total'],
            'post_status' => 'NOT POSTED',
            'server_status_c' => 'PENDING',
            'actual_cost_fc' => 0,
            'dic_percentage_fc' => 0,
            'dic_amount_fc' => 0,
            'sub_total_fc' => 0,
            'currency_rate' => 0,
            'unit_exp_bc' => 0,
            'unit_cost_bc' => 0,
        ]);
    }

    public function addInventoryTransMaster($purchase_master, $purchase_child, $inventory_id)
    {
        return InventoryTransMaster::updateOrCreate([
            'inventory_trans_master_id' => $inventory_id
        ], [
            'trans_date' => $purchase_master->purchase_date,
            'trans_type' => 'PURCHASE(PU)',
            'trans_master_id' => $purchase_master->purchase_id,
            'trans_child_id' => $purchase_child->purchase_child_id,
            'product_id' => $purchase_child->product_id,
            'unique_id' => $purchase_child->unique_id,
            'pack_qty' => $purchase_child->pack_qty,
            'trans_qty' => $purchase_child->quantity,
            'trans_status' => 'PENDING',
        ]);
    }

    public function addVoucherMaster($request, $voucher_master_id, $purchase_master, $is_cash = false, $voucher_master_parent_id = null)
    {
        if ($is_cash) {
            $voucher_type_id = getPaymentVoucherNameCashPurchaseAccountId();
        } else {
            $voucher_type_id = getPurchaseEntryVoucherNameAccountId();
        }
        return VoucherMaster::updateOrCreate(
            [
                'voucher_master_id' => $voucher_master_id,
            ], [
            'voucher_type_id' => $voucher_type_id,
            'manual_voucher_no' => getMaxId('voucher_master', 'manual_voucher_no'),
            'auto_voucher_no' => getMaxId('voucher_master', 'auto_voucher_no'),
            'voucher_prefix' => VoucherTypeMaster::query()->where('voucher_type_id', $voucher_type_id)->first()->voucher_prefix,
            'voucher_date' => $purchase_master->purchase_date,
            'entered_date' => $purchase_master->purchase_date,
            'ref_no' => $is_cash ? '' : $purchase_master->supplier_invoice_no,
            'staff_id' => auth()->user()->id,
            'voucher_amount' => $request->accounts['voucher_amount'] ?? 0,
            'remark' => ($is_cash ? 'AUTO PAYMENT FOR PURCHASE' : 'BOPURCHASE') . $purchase_master->purchase_no,
            'post_status' => 'PENDING',
            'creation_mode' => $is_cash ? 'BOCASHPURCHASE' : 'BOPURCHASE',
            'voucher_posted_id' => $is_cash ? $voucher_master_parent_id : $purchase_master->purchase_id,
        ]);
    }

    public function addVoucherChild($account, $voucher_child_id, $voucher_master, $purchase_master, $is_cash = false)
    {
        return VoucherChild::updateOrCreate(
            [
                'voucher_child_id' => $voucher_child_id,
            ], [
            'voucher_master_id' => $voucher_master->voucher_master_id,
            'account_id' => $account['accountID'],
            'cr_amount' => $account['credit'],
            'dr_amount' => $account['debit'],
            'os_balance' => $account['osBalance'],
            'narration' => 'BOPURCHASE' . $voucher_master->auto_voucher_no,
            'post_status' => 'NOT POSTED',
            'payment_mode' => $purchase_master->payment_mode,
        ]);
    }

    public function generateVoucherChild($request, $purchase_master, $cash_voucher_master)
    {
        $voucher_child_id = getMaxId('voucher_child', 'voucher_child_id');
        VoucherChild::create(
            [
                'voucher_child_id' => $voucher_child_id,
                'voucher_master_id' => $cash_voucher_master->voucher_master_id,
                'account_id' => $purchase_master->supplier_id,
                'dr_amount' => $purchase_master->net_amount,
                'cr_amount' => 0,
                'os_balance' => 0,
                'narration' => 'PV' . $cash_voucher_master->auto_voucher_no,
                'post_status' => 'NOT POSTED',
                'payment_mode' => 'CASH',
            ]);

        $voucher_child_id = getMaxId('voucher_child', 'voucher_child_id');
        VoucherChild::create(
            [
                'voucher_child_id' => $voucher_child_id,
                'voucher_master_id' => $cash_voucher_master->voucher_master_id,
                'account_id' => $request->top['account_head_id'] ?? null,
                'dr_amount' => 0,
                'cr_amount' => $purchase_master->net_amount,
                'os_balance' => 0,
                'narration' => 'PV' . $cash_voucher_master->auto_voucher_no,
                'post_status' => 'NOT POSTED',
                'payment_mode' => 'CASH',
            ]);


    }

    public function postPurchase(Request $request, $id)
    {

    }

    public function cancelPurchase(Request $request, $id)
    {

    }

}
