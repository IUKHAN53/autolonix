<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductDrilldownMaster>
 */
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
            'drilldown_id' => $this->faker->randomNumber(),
            'drilldown_type' => $this->faker->text(50),
            'parent_id' => $this->faker->randomNumber(),
            'drilldown_code' => $this->faker->text(50),
            'drilldown_description' => $this->faker->text(300),
            'drilldown_description_arabic' => $this->faker->text(300),
            'upload_status' => $this->faker->text(50),
            'station_id' => $this->faker->randomNumber(),
            'drilldown_status' => $this->faker->text(20),
            'drilldown_image' => $this->faker->imageUrl(),
            'cr_by' => $this->faker->text(50),
            'cr_on' => $this->faker->dateTime(),
            'mod_by' => $this->faker->text(50),
            'mod_on' => $this->faker->dateTime(),
        ];
    }
}
