<?php

namespace Database\Seeders;

use App\Models\ProductChildPrice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductChildPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductChildPrice::factory()->count(5)->create();
    }
}
