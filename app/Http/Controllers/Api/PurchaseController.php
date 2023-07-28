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
                'account_heads' => AccountHeadMaster::query()->where('posting_allowed', 1)
                    ->where('account_no', 'LIKE', '03-02%')
                    ->where('account_id', '>', 100)
                    ->pluck('account_name', 'account_id')->toArray(),
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

    public function updatePurchase(Request $request)
    {
        DB::beginTransaction();
        try {
            $purchase_master = $this->addPurchaseMaster($request->purchase_master_id);
            foreach ($request->products as $product) {
                $purchase_child_id = $request->purchase_child_id ?? getMaxId('purchase_child', 'purchase_child_id');
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

    public function deletePurchase(Request $request)
    {

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
            'remarks' => $request->top['note'] ?? '',
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
            'unique_id' => $product['unique_id'],
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
            'trans_child_id' => $purchase_child->purchase_detail_id,
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
            'manual_voucher_no' => getMaxId('voucher_master', 'purchase_no'),
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
                'account_id' => $request->top['account_head_id'],
                'dr_amount' => 0,
                'cr_amount' => $purchase_master->net_amount,
                'os_balance' => 0,
                'narration' => 'PV' . $cash_voucher_master->auto_voucher_no,
                'post_status' => 'NOT POSTED',
                'payment_mode' => 'CASH',
            ]);


    }

}
