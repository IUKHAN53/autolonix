<?php

namespace Database\Seeders;

use App\Models\ProductDrilldownMaster;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductDrilldownMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductDrilldownMaster::factory()->count(30)->create();
    }
}
