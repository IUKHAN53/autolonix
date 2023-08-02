<?php

namespace Database\Factories;

use App\Models\ProductDrilldownMaster;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
class ProductDrilldownMasterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'drilldown_type' => $this->faker->randomElement(['Department', 'Category','Brand']),
            'drilldown_id' => getMaxId('product_drilldown_masters', 'drilldown_id'),
            'parent_id' => ProductDrilldownMaster::query()->inRandomOrder()->first()->id ?? null,
            'drilldown_code' => $this->faker->text(10),
            'drilldown_description' => $this->faker->text(50),
            'drilldown_description_arabic' => $this->faker->text(50),
            'upload_status' => $this->faker->text(50),
            'station_id' => 10,
            'drilldown_status' => $this->faker->text(20),
            'cr_by' => User::query()->inRandomOrder()->first()->id,
            'cr_on' => now(),
        ];
    }

}
