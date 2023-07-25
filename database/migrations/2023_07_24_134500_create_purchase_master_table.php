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
        Schema::create('purchase_master', function (Blueprint $table) {
            $table->id();
            $table->enum('transaction_type', ['PURCHASE','PURCHASE RETURN'])->default('PURCHASE');
            $table->bigInteger('purchase_id')->index()->nullable();
            $table->char('prefix', 5)->nullable();
            $table->decimal('purchase_no', 18, 0)->nullable();
            $table->string('supplier_ref_no', 50)->nullable();
            $table->datetime('purchase_date')->nullable();
            $table->bigInteger('supplier_id')->nullable();
            $table->string('payment_mode', 50)->nullable();
            $table->decimal('discount_amount_m', 18, 2)->nullable();
            $table->decimal('sub_total_m', 18, 2)->nullable();
            $table->decimal('non_taxable_amount', 18, 2)->nullable();
            $table->decimal('input_tax1_rate_m', 18, 2)->nullable();
            $table->decimal('input_tax1_amount_m', 18, 2)->nullable();
            $table->decimal('input_tax2_rate_m', 18, 2)->nullable();
            $table->decimal('input_tax2_amount_m', 18, 2)->nullable();
            $table->decimal('input_tax3_rate_m', 18, 2)->nullable();
            $table->decimal('input_tax3_amount_m', 18, 2)->nullable();
            $table->decimal('input_tax4_rate_m', 18, 2)->nullable();
            $table->decimal('input_tax4_amount_m', 18, 2)->nullable();
            $table->decimal('input_tax5_rate_m', 18, 2)->nullable();
            $table->decimal('input_tax5_amount_m', 18, 2)->nullable();
            $table->decimal('total_amount', 18, 2)->nullable();
            $table->decimal('round_off_adj', 18, 2)->nullable();
            $table->decimal('net_amount', 18, 2)->nullable();
            $table->string('post_status', 50)->default('PENDING');
            $table->bigInteger('received_by_id')->nullable();
            $table->bigInteger('staff_id')->nullable();
            $table->bigInteger('station_id')->nullable();
            $table->string('counter_close_status', 50)->default('PENDING');
            $table->string('server_status', 50)->default('PENDING');
            $table->text('remarks')->nullable();
            $table->timestamp('r_status')->nullable();
            $table->string('purchase_type', 15)->default('LOCAL PURCHASE');
            $table->bigInteger('currency_id')->nullable()->nullable();
            $table->decimal('currency_rate', 18, 6)->nullable();
            $table->string('container_no', 50)->nullable();
            $table->string('port', 50)->nullable();
            $table->bigInteger('tax_group_id')->nullable();
            $table->string('bol', 50)->nullable();
            $table->string('clearing_agent', 50)->nullable();
            $table->string('shipping_method', 50)->nullable();
            $table->decimal('sub_total_fc', 18, 6)->nullable();
            $table->decimal('discount_amount_fc', 18, 6)->nullable();
            $table->decimal('round_off_adjustment_fc', 18, 6)->nullable();
            $table->decimal('invoice_amount_fc', 18, 6)->nullable();
            $table->decimal('additional_charges', 18, 2)->nullable();
            $table->decimal('net_vat', 18, 2)->nullable();
            $table->decimal('gross_amount_aed', 18, 2)->nullable();
            $table->decimal('items_total_bc', 18, 2)->nullable();
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
        Schema::dropIfExists('purchase_master');
    }
};
