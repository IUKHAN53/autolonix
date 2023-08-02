<?php

namespace Database\Factories;

use App\Models\ProductDrilldownMaster;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductMasterFactory extends Factory
{

    public function definition(): array
    {
        return [
            'product_code' => $this->faker->text(10),
            'product_name' => $this->faker->text(25),
            'specification' => $this->faker->text(50),
            'category_id' => ProductDrilldownMaster::query()->category()->parent()->inRandomOrder()->first()->id ?? null,
            'department_id' => ProductDrilldownMaster::query()->department()->inRandomOrder()->first()->id ?? null,
            'unit' => 'KG',
            'pack_qty' => 1,
            'pack_details' => $this->faker->text(10),
            'is_master' => $this->faker->randomElement(['Yes', 'No']),
            'model' => $this->faker->text(10),
            'upload_status' => 0,
            'product_type' => 'STOCK',
        ];
    }
}
