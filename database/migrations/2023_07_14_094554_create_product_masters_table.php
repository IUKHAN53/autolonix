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
        Schema::create('product_masters', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id');
            $table->string('product_code', 50);
            $table->string('barcode', 50);
            $table->string('product_name', 150);
            $table->string('product_name_arabic', 150);
            $table->string('specification', 250);
            $table->bigInteger('category_id');
            $table->bigInteger('sub_category_id');
            $table->bigInteger('sub_sub_category_id');
            $table->bigInteger('product_brand_id');
            $table->bigInteger('department_id');
            $table->string('unit', 50);
            $table->decimal('pack_qty', 18, 4);
            $table->char('pack_details', 10);
            $table->char('is_master', 10);
            $table->char('stock_type', 10);
            $table->char('product_status', 10);
            $table->bigInteger('unique_id');
            $table->bigInteger('substitute_no');
            $table->char('model', 10);
            $table->string('engine_no', 50);
            $table->string('chassis_no', 50);
            $table->string('ome_code', 50);
            $table->char('r_status_m', 10);
            $table->text('remarks')->nullable();
            $table->char('upload_status', 10);
            $table->string('product_type', 10);
            $table->binary('product_image')->nullable();
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
        Schema::dropIfExists('product_masters');
    }
};
