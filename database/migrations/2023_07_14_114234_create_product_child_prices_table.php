<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('product_child_prices', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('unique_id')->nullable();
            $table->bigInteger('product_child_price_id')->nullable();
            $table->bigInteger('price_level_id')->nullable();
            $table->bigInteger('service_id')->nullable();
            $table->decimal('unit_price', 19, 4)->nullable();
            $table->decimal('ot_amount1', 19, 4)->nullable();
            $table->decimal('ot_amount2', 19, 4)->nullable();
            $table->decimal('ot_amount3', 19, 4)->nullable();
            $table->decimal('ot_amount4', 19, 4)->nullable();
            $table->decimal('ot_rate1', 18, 2)->nullable();
            $table->decimal('ot_rate2', 18, 2)->nullable();
            $table->decimal('ot_rate3', 18, 2)->nullable();
            $table->decimal('ot_rate4', 18, 2)->nullable();
            $table->char('upload_status_p', 10)->nullable();
            $table->dateTime('cr_on')->nullable();
            $table->dateTime('mod_on')->nullable();
            $table->bigInteger('station_id')->nullable();
            $table->foreignId('cr_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('mod_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_child_prices');
    }
};
