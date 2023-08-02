<?php

use App\Models\AccountsParameter;
use App\Models\GlobalSettings;
use App\Models\InventoryTransMaster;
use Illuminate\Support\Facades\DB;

function uom()
{
    return GlobalSettings::query()->where('type', 'UOM')->pluck('name', 'value')->toArray();
}

function productType()
{
    return GlobalSettings::query()->where('type', 'PRODUCTTYPE')->pluck('name', 'value')->toArray();
}

function outputVat()
{
    return GlobalSettings::query()->where('type', 'OUTPUTVAT')->pluck('name', 'value')->toArray();
}

function purchasePaymentMode()
{
    return GlobalSettings::query()->where('type', 'PurchasePaymentMode')->pluck('name', 'value')->toArray();
}

function salesPaymentMode()
{
    return GlobalSettings::query()->where('type', 'SalesPaymentMode')->pluck('name', 'value')->toArray();
}

function getCustomerAccountId()
{
    return AccountsParameter::where('parameter_name', 'CustomerLedger')->pluck('account_id')->first();
}

function getSupplierAccountId()
{
    return AccountsParameter::where('parameter_name', 'SupplierLedger')->pluck('account_id')->first();
}

function getStationId()
{
    return GlobalSettings::query()->where('type', 'station_id')->pluck('value')->first();
}

function getMaxId($table, $column, ...$conditions)
{

    $table = DB::table($table);
    foreach ($conditions as $condition) {
        $table = $table->where($condition['column'], $condition['operator'] ?? '=', $condition['value']);
    }
    $id = $table->max($column);
    if ($id == null) {
        $id = 1;
    } elseif ($id >= 0) {
        $id = $id + 1;
    }
    return $id;

}

function getPurchaseEntryVoucherNameAccountId()
{
    return AccountsParameter::where('parameter_name', 'PurchaseEntryVoucherName')->pluck('account_id')->first();
}
function getPaymentVoucherNameCashPurchaseAccountId()
{
    return AccountsParameter::where('parameter_name', 'PaymentVoucherNameCashPurchase')->pluck('account_id')->first();
}


