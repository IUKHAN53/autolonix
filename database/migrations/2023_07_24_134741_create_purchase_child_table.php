<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchase_child', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('purchase_child_id')->nullable();
            $table->bigInteger('purchase_id')->nullable();
            $table->bigInteger('product_id')->nullable();
            $table->string('product_code', 50)->nullable();
            $table->string('product_name', 150)->nullable();
            $table->string('product_name_arabic', 150)->nullable();
            $table->bigInteger('unique_id')->nullable();
            $table->decimal('foc_qty', 18, 4)->nullable();
            $table->decimal('qty', 18, 4)->nullable();
            $table->decimal('pack_qty', 18, 4)->nullable();
            $table->decimal('unit_cost', 18, 2)->nullable();
            $table->decimal('discount_amount_c', 18, 2)->nullable();
            $table->decimal('sub_total_c', 18, 2)->nullable();
            $table->decimal('non_taxable_amount_c', 18, 2)->nullable();
            $table->decimal('input_tax1_rate_c', 18, 2)->nullable();
            $table->decimal('input_tax1_amount_c', 18, 2)->nullable();
            $table->decimal('input_tax2_rate_c', 18, 2)->nullable();
            $table->decimal('input_tax2_amount_c', 18, 2)->nullable();
            $table->decimal('input_tax3_rate_c', 18, 2)->nullable();
            $table->decimal('input_tax3_amount_c', 18, 2)->nullable();
            $table->decimal('input_tax4_rate_c', 18, 2)->nullable();
            $table->decimal('input_tax4_amount_c', 18, 2)->nullable();
            $table->decimal('input_tax5_rate_c', 18, 2)->nullable();
            $table->decimal('input_tax5_amount_c', 18, 2)->nullable();
            $table->decimal('line_total', 18, 2)->nullable();
            $table->string('post_status', 50)->default('PENDING');
            $table->bigInteger('station_id')->nullable();
            $table->timestamp('r_status')->nullable();
            $table->string('server_status_c', 20)->default('PENDING');
            $table->decimal('actual_cost_fc', 18, 6)->nullable();
            $table->decimal('dic_percentage_fc', 18, 2)->nullable();
            $table->decimal('dic_amount_fc', 18, 6)->nullable();
            $table->decimal('sub_total_fc', 18, 6)->nullable();
            $table->decimal('currency_rate', 18, 6)->nullable();
            $table->decimal('unit_exp_bc', 18, 6)->nullable();
            $table->decimal('unit_cost_bc', 18, 6)->nullable();
            $table->string('cr_by', 50)->nullable();
            $table->datetime('cr_on')->nullable();
            $table->string('mod_by', 50)->nullable();
            $table->datetime('mod_on')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_child');
    }
};
