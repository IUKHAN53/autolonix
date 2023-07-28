<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountHeadMaster>
 */
class AccountHeadMasterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => $this->faker->numberBetween(1, 100),
            'account_no' => $this->faker->regexify('[A-Z0-9]{50}'),
            'account_code' => $this->faker->regexify('[A-Z0-9]{50}'),
            'account_type' => $this->faker->randomElement(['Type A', 'Type B', 'Type C']),
            'account_name' => $this->faker->text(50),
            'level_no' => $this->faker->numberBetween(1, 10),
            'display_order' => $this->faker->numberBetween(1, 100),
            'posting_allowed' => $this->faker->boolean,
            'trn_no' => $this->faker->regexify('[A-Z0-9]{25}'),
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'credit_limit' => $this->faker->randomFloat(2, 0, 2000),
            'credit_period' => $this->faker->randomNumber(2),
            'credit_status' => $this->faker->randomElement(['ACTIVE', 'INACTIVE']),
            'nature_of_trns_id' => $this->faker->numberBetween(1, 10),
            'tax_group_id' => $this->faker->numberBetween(1, 10),
            'station_id' => 10,
            'address' => $this->faker->address,
            'address_arabic' => $this->faker->text(50),
            'area' => $this->faker->word,
            'po_box' => $this->faker->postcode,
            'telephone' => $this->faker->phoneNumber,
            'mobile_no' => $this->faker->phoneNumber,
            'email' => $this->faker->email,
            'price_level' => $this->faker->numberBetween(0, 5),
            'cp1_name' => $this->faker->name,
            'cp1_designation' => $this->faker->jobTitle,
            'cp1_mobile' => $this->faker->phoneNumber,
            'cp2_name' => $this->faker->name,
            'cp2_designation' => substr($this->faker->jobTitle, 30),
            'cp2_mobile' => $this->faker->phoneNumber,
            'la_profit_per' => $this->faker->randomFloat(2, 0, 100),
            'pa_profit_per' => $this->faker->randomFloat(2, 0, 100),
            'cu_profit_per' => $this->faker->randomFloat(2, 0, 100),
            'lu_profit_per' => $this->faker->randomFloat(2, 0, 100),
            'su_profit_per' => $this->faker->randomFloat(2, 0, 100),
            'upload_status' => 0,
            'remarks' => $this->faker->paragraph,
        ];
    }
}
