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
        Schema::create('product_child', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_child_id')->nullable();
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('unique_id')->nullable();
            $table->decimal('pack_qty', 18, 4)->nullable();
            $table->bigInteger('station_id')->nullable();
            $table->decimal('qty_on_hand', 18, 4)->nullable();
            $table->decimal('min_stock', 18, 4)->nullable();
            $table->decimal('reorder_level', 18, 4)->nullable();
            $table->decimal('max_stock', 18, 4)->nullable();
            $table->decimal('reorder_qty', 18, 4)->nullable();
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
            $table->timestamp('r_status')->nullable();
            $table->char('upload_status_c', 10)->default('PENDING');
            $table->foreignId('cr_by')->nullable()->constrained('users')->onDelete('set null');
            $table->dateTime('cr_on')->nullable();
            $table->foreignId('mod_by')->nullable()->constrained('users')->onDelete('set null');
            $table->dateTime('mod_on')->nullable();
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
