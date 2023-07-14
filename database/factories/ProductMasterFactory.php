<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductMasterFactory extends Factory
{

    public function definition(): array
    {
        return [
            'product_id' => $this->faker->randomNumber(),
            'product_code' => $this->faker->text(50),
            'barcode' => $this->faker->text(50),
            'product_name' => $this->faker->text(150),
            'product_name_arabic' => $this->faker->text(150),
            'specification' => $this->faker->text(250),
            'category_id' => $this->faker->randomNumber(),
            'sub_category_id' => $this->faker->randomNumber(),
            'sub_sub_category_id' => $this->faker->randomNumber(),
            'product_brand_id' => $this->faker->randomNumber(),
            'department_id' => $this->faker->randomNumber(),
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
            'product_image' => $this->faker->imageUrl(),
            'cr_by' => $this->faker->text(10),
            'cr_on' => $this->faker->dateTime(),
            'mod_by' => $this->faker->text(10),
            'mod_on' => $this->faker->dateTime(),
            'user_id' => User::query()->inRandomOrder()->first()->id,
        ];
    }
}
