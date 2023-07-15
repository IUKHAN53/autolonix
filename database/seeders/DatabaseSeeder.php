<?php

namespace Database\Seeders;

use App\Models\AccountHeadMaster;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::factory(10)->create();

         \App\Models\User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
         ]);
         $this->call([
             ProductDrilldownMasterSeeder::class,
             AccountHeadMasterSeeder::class,
             ProductMasterSeeder::class,
             ProductChildSeeder::class,
             ProductChildPriceSeeder::class,
         ]);
    }
}
