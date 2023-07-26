<?php

namespace Database\Seeders;

use App\Models\ProductChild;
use Illuminate\Database\Seeder;

class ProductChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        ProductChild::factory()->count(5)->create();
    }
}
