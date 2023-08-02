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
        $id = ProductMaster::query()->inRandomOrder()->first()->id;
        return [
            'product_child_id' => getMaxId('product_child', 'product_child_id'),
            'product_id' => $id,
            'unique_id' => $id,
            'pack_qty' => $this->faker->randomFloat(4, 0, 100),
            'station_id' => 10,
            'qty_on_hand' => 0,
            'min_stock' => $this->faker->randomFloat(4, 0, 100),
            'reorder_level' => $this->faker->randomFloat(4, 0, 100),
            'max_stock' => $this->faker->randomFloat(4, 0, 100),
            'reorder_qty' => $this->faker->randomFloat(4, 0, 100),
            'average_cost' => $this->faker->randomFloat(4, 0, 100),
            'last_purchase_cost' => $this->faker->randomFloat(4, 0, 100),
            'it_amount1' => $this->faker->randomFloat(4, 0, 100),
            'it_amount2' => $this->faker->randomFloat(4, 0, 100),
            'it_amount3' => $this->faker->randomFloat(4, 0, 100),
            'it_amount4' => $this->faker->randomFloat(4, 0, 100),
            'it_rate1' => $this->faker->randomFloat(2, 0, 100),
            'it_rate2' => $this->faker->randomFloat(2, 0, 100),
            'it_rate3' => $this->faker->randomFloat(2, 0, 100),
            'it_rate4' => $this->faker->randomFloat(2, 0, 100),
            'last_supplier_id' => $this->faker->randomNumber(),
            'location' => $this->faker->word,
            'upload_status_c' => 0,
            'cr_by' => User::query()->inRandomOrder()->first()->id,
            'cr_on' => now(),
        ];
    }
}
