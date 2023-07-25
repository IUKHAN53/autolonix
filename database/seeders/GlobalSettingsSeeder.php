<?php

namespace Database\Seeders;

use App\Models\GlobalSettings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GlobalSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'PCS',
                'value' => 'PCS',
                'type' => 'UOM',
            ],
            [
                'name' => 'KiloGram',
                'value' => 'KG',
                'type' => 'UOM',
            ],
            [
                'name' => 'LT',
                'value' => 'LT',
                'type' => 'UOM',
            ],
            [
                'name' => 'PACK',
                'value' => 'PACK',
                'type' => 'UOM',
            ],
            [
                'name' => 'STOCK',
                'value' => 'STOCK',
                'type' => 'PRODUCTTYPE',
            ],
            [
                'name' => 'NONSTOCK',
                'value' => 'NONSTOCK',
                'type' => 'PRODUCTTYPE',
            ],
            [
                'name' => '5',
                'value' => '5',
                'type' => 'OUTPUTVAT',
            ],
            [
                'name' => '7',
                'value' => '7',
                'type' => 'OUTPUTVAT',
            ],
            [
                'name' => '10',
                'value' => '10',
                'type' => 'OUTPUTVAT',
            ],
            [
                'name' => 'Cash',
                'value' => 'Cash',
                'type' => 'PurchasePaymentMode',
            ],
            [
                'name' => 'Credit',
                'value' => 'Credit',
                'type' => 'PurchasePaymentMode',
            ],
            [
                'name' => 'Cash',
                'value' => 'Cash',
                'type' => 'SalesPaymentMode',
            ],
            [
                'name' => 'Credit',
                'value' => 'Credit',
                'type' => 'SalesPaymentMode',
            ],
            [
                'name' => 'CreditCard',
                'value' => 'CreditCard',
                'type' => 'SalesPaymentMode',
            ],
            [
                'name' => 'Voucher',
                'value' => 'Voucher',
                'type' => 'SalesPaymentMode',
            ],
            [
                'name' => 'station_id',
                'value' => '10',
                'type' => 'station_id',
            ],
            [
                'name' => 'station_id',
                'value' => '10',
                'type' => 'station_id',
            ],

        ];

        foreach ($data as $value) {
            GlobalSettings::create($value);
        }

    }
}
