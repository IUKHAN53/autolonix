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
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('unique_id')->nullable();
            $table->string('product_code', 50)->nullable();
            $table->string('barcode', 50)->nullable();
            $table->string('product_name', 150)->nullable();
            $table->string('product_name_arabic', 150)->nullable();
            $table->string('description', 250)->nullable();
            $table->string('specification', 250)->nullable();
            $table->string('unit', 50)->nullable();
            $table->decimal('pack_qty')->default(1);
            $table->char('pack_details', 10)->default('PCS');
            $table->char('is_master', 10)->default('Yes');
            $table->char('stock_type', 10)->default('STOCK');
            $table->char('product_status', 10)->default('ACTIVE');
            $table->bigInteger('substitute_no')->nullable();
            $table->char('model', 10)->nullable();
            $table->string('engine_no', 50)->nullable();
            $table->string('chassis_no', 50)->nullable();
            $table->string('ome_code', 50)->nullable();
            $table->timestamp('r_status')->nullable();
            $table->text('remarks')->nullable();
            $table->char('upload_status', 10)->default('PENDING');
            $table->string('product_type', 10)->nullable();
            $table->string('product_image')->nullable();
            $table->dateTime('cr_on')->nullable();
            $table->dateTime('mod_on')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('product_drilldown_masters')->onDelete('set null');;
            $table->foreignId('sub_category_id')->nullable()->constrained('product_drilldown_masters')->onDelete('set null');;
            $table->foreignId('sub_sub_category_id')->nullable()->constrained('product_drilldown_masters')->onDelete('set null');;
            $table->foreignId('product_brand_id')->nullable()->constrained('product_drilldown_masters')->onDelete('set null');;
            $table->foreignId('department_id')->nullable()->constrained('product_drilldown_masters')->onDelete('set null');;
            $table->foreignId('cr_by')->nullable()->constrained('users')->onDelete('set null');;
            $table->foreignId('mod_by')->nullable()->constrained('users')->onDelete('set null');;
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
