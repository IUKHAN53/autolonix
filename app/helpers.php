<?php

use App\Models\GlobalSettings;

function uom($query)
{
    return GlobalSettings::query()->where('type', 'UOM')->pluck('name', 'value')->toArray();
}

function productType($query)
{
    return GlobalSettings::query()->where('type', 'PRODUCTTYPE')->pluck('name', 'value')->toArray();
}

function outputVat($query)
{
    return GlobalSettings::query()->where('type', 'OUTPUTVAT')->pluck('name', 'value')->toArray();
}

function purchasePaymentMode($query)
{
    return GlobalSettings::query()->where('type', 'PurchasePaymentMode')->pluck('name', 'value')->toArray();
}

function salesPaymentMode($query)
{
    return GlobalSettings::query()->where('type', 'SalesPaymentMode')->pluck('name', 'value')->toArray();
}
