<?php

use App\Models\AccountsParameter;
use App\Models\GlobalSettings;

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
    return  AccountsParameter::where('parameter_name', 'SupplierLedger')->pluck('account_id')->first();
}

function getStationId()
{
    return  GlobalSettings::query()->where('type', 'station_id')->pluck('value')->first();
}
