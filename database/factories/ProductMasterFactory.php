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
            'product_code' => $this->faker->text(50),
            'barcode' => $this->faker->text(50),
            'product_name' => $this->faker->text(150),
            'product_name_arabic' => $this->faker->text(150),
            'specification' => $this->faker->text(250),
            'category_id' => ProductDrilldownMaster::query()->category()->parent()->inRandomOrder()->first()->id ?? null,
            'department_id' => ProductDrilldownMaster::query()->department()->inRandomOrder()->first()->id ?? null,
            'unit' => $this->faker->text(50),
            'pack_qty' => $this->faker->randomFloat(4, 0, 9999),
            'pack_details' => $this->faker->text(10),
            'is_master' => $this->faker->randomElement(['Yes', 'No']),
            'stock_type' => $this->faker->text(10),
            'product_status' => $this->faker->text(10),
            'unique_id' => $this->faker->randomNumber(),
            'substitute_no' => $this->faker->randomNumber(),
            'model' => $this->faker->text(10),
            'engine_no' => $this->faker->text(50),
            'chassis_no' => $this->faker->text(50),
            'ome_code' => $this->faker->text(50),
            'r_status_m' => $this->faker->text(10),
            'remarks' => $this->faker->text(),
            'upload_status' => $this->faker->text(10),
            'product_type' => $this->faker->text(10),
            'cr_by' => User::query()->inRandomOrder()->first()->id,
            'cr_on' => $this->faker->dateTime(),
        ];
    }
}
