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
        Schema::create('product_children', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_child_id');
            $table->bigInteger('product_id');
            $table->bigInteger('unique_id');
            $table->decimal('pack_qty', 18, 4);
            $table->bigInteger('station_id');
            $table->decimal('qty_on_hand', 18, 4);
            $table->decimal('min_stock', 18, 4);
            $table->decimal('reorder_level', 18, 4);
            $table->decimal('max_stock', 18, 4);
            $table->decimal('reorder_qty', 18, 4);
            $table->decimal('average_cost', 19, 4)->nullable();
            $table->decimal('last_purchase_cost', 19, 4)->nullable();
            $table->decimal('it_amount1', 19, 4)->nullable();
            $table->decimal('it_amount2', 19, 4)->nullable();
            $table->decimal('it_amount3', 19, 4)->nullable();
            $table->decimal('it_amount4', 19, 4)->nullable();
            $table->decimal('it_rate1', 18, 2)->nullable();
            $table->decimal('it_rate2', 18, 2)->nullable();
            $table->decimal('it_rate3', 18, 2)->nullable();
            $table->decimal('it_rate4', 18, 2)->nullable();
            $table->bigInteger('last_supplier_id')->nullable();
            $table->string('location', 100)->nullable();
            $table->char('r_status_c', 10);
            $table->char('upload_status_c', 10);
            $table->char('cr_by', 10);
            $table->dateTime('cr_on');
            $table->char('mod_by', 10);
            $table->dateTime('mod_on');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_children');
    }
};
