<?php

namespace Database\Seeders;

use App\Models\AccountHeadMaster;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountHeadMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AccountHeadMaster::factory()->count(20)->create();
    }
}
