<?php

namespace Database\Factories;

use App\Models\ProductChild;
use App\Models\ProductMaster;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductChildFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductChild::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_id' => ProductMaster::query()->inRandomOrder()->first()->id,
            'unique_id' => ProductMaster::query()->inRandomOrder()->first()->id,
            'pack_qty' => $this->faker->randomFloat(4, 0, 9999),
            'station_id' => $this->faker->randomNumber(),
            'qty_on_hand' => $this->faker->randomFloat(4, 0, 9999),
            'min_stock' => $this->faker->randomFloat(4, 0, 9999),
            'reorder_level' => $this->faker->randomFloat(4, 0, 9999),
            'max_stock' => $this->faker->randomFloat(4, 0, 9999),
            'reorder_qty' => $this->faker->randomFloat(4, 0, 9999),
            'average_cost' => $this->faker->randomFloat(4, 0, 9999),
            'last_purchase_cost' => $this->faker->randomFloat(4, 0, 9999),
            'it_amount1' => $this->faker->randomFloat(4, 0, 9999),
            'it_amount2' => $this->faker->randomFloat(4, 0, 9999),
            'it_amount3' => $this->faker->randomFloat(4, 0, 9999),
            'it_amount4' => $this->faker->randomFloat(4, 0, 9999),
            'it_rate1' => $this->faker->randomFloat(2, 0, 9999),
            'it_rate2' => $this->faker->randomFloat(2, 0, 9999),
            'it_rate3' => $this->faker->randomFloat(2, 0, 9999),
            'it_rate4' => $this->faker->randomFloat(2, 0, 9999),
            'last_supplier_id' => $this->faker->randomNumber(),
            'location' => $this->faker->word,
            'r_status_c' => $this->faker->randomElement(['status1', 'status2', 'status3']),
            'upload_status_c' => $this->faker->randomElement(['status1', 'status2', 'status3']),
            'cr_by' => User::query()->inRandomOrder()->first()->id,
            'cr_on' => $this->faker->dateTime(),
        ];
    }
}
