<?php

namespace Database\Seeders;

use App\Models\AccountHeadMaster;
use App\Models\GlobalSettings;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(5)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'role_id' => 2,
        ]);
        $this->call([
            GlobalSettingsSeeder::class,
            ProductDrilldownMasterSeeder::class,
            AccountHeadMasterSeeder::class,
            ProductMasterSeeder::class,
            ProductChildSeeder::class,
            ProductChildPriceSeeder::class,
            AccountsParameterSeeder::class,
            VoucherTypeMasterSeeder::class,
        ]);
    }
}
