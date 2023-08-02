<?php

namespace Database\Factories;

use App\Models\ProductMaster;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductChildPrice>
 */
class ProductChildPriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $id = ProductMaster::query()->inRandomOrder()->first()->id;
        return [
            'product_child_price_id' => getMaxId('product_child_prices', 'product_child_price_id'),
            'product_id' => $id,
            'unique_id' => $id,
            'price_level_id' => $this->faker->randomNumber(),
            'service_id' => $this->faker->randomNumber(),
            'unit_price' => $this->faker->randomFloat(2, 0, 20),
            'ot_amount1' => $this->faker->randomFloat(2, 0, 20),
            'ot_amount2' => $this->faker->randomFloat(2, 0, 20),
            'ot_amount3' => $this->faker->randomFloat(2, 0, 20),
            'ot_amount4' => $this->faker->randomFloat(2, 0, 20),
            'ot_rate1' => $this->faker->randomFloat(2, 0, 20),
            'ot_rate2' => $this->faker->randomFloat(2, 0, 20),
            'ot_rate3' => $this->faker->randomFloat(2, 0, 20),
            'ot_rate4' => $this->faker->randomFloat(2, 0, 20),
            'upload_status_p' => $this->faker->randomElement(['status1', 'status2', 'status3']),
            'cr_by' => User::query()->inRandomOrder()->first()->id,
            'cr_on' => now(),
            'station_id' => 10,
        ];
    }
}
