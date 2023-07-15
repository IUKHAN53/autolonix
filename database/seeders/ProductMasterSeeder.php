<?php

namespace Database\Seeders;

use App\Models\ProductMaster;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductMaster::factory()->count(25)->create();
    }
}
