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
        Schema::create('account_head_masters', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('account_id')->nullable();
            $table->bigInteger('parent_account_id')->nullable();
            $table->string('account_no', 50)->nullable();
            $table->string('account_code', 50)->nullable();
            $table->string('account_type', 15)->nullable();
            $table->string('account_name', 250)->nullable();
            $table->string('account_name_arabic', 250)->nullable();
            $table->string('alias_name', 250)->nullable();
            $table->bigInteger('level_no')->nullable();
            $table->string('account_balance_type', 20)->nullable();
            $table->string('group_type', 20)->nullable();
            $table->integer('display_order')->nullable();
            $table->integer('posting_allowed')->nullable();
            $table->string('trn_no', 25)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('country', 80)->nullable();
            $table->decimal('credit_limit', 18, 2)->nullable();
            $table->decimal('credit_period', 18, 0)->nullable();
            $table->char('credit_status', 10)->default('ACTIVE');
            $table->bigInteger('nature_of_trns_id')->default(1);
            $table->bigInteger('tax_group_id')->default(1);
            $table->bigInteger('station_id')->nullable();
            $table->string('address', 250)->nullable();
            $table->string('address_arabic', 250)->nullable();
            $table->string('area', 50)->nullable();
            $table->string('area_arabic', 50)->nullable();
            $table->string('po_box', 50)->nullable();
            $table->string('telephone', 50)->nullable();
            $table->string('mobile_no', 50)->nullable();
            $table->string('fax_no', 50)->nullable();
            $table->string('email', 100)->nullable();
            $table->char('payment_mode', 10)->nullable();
            $table->bigInteger('price_level')->default(0)->nullable();
            $table->string('cp1_name', 50)->nullable();
            $table->string('cp1_designation', 50)->nullable();
            $table->string('cp1_mobile', 50)->nullable();
            $table->string('cp2_name', 50)->nullable();
            $table->string('cp2_designation', 50)->nullable();
            $table->string('cp2_mobile', 50)->nullable();
            $table->decimal('la_profit_per', 18, 2)->nullable();
            $table->decimal('pa_profit_per', 18, 2)->nullable();
            $table->decimal('cu_profit_per', 18, 2)->nullable();
            $table->decimal('lu_profit_per', 18, 2)->nullable();
            $table->decimal('su_profit_per', 18, 2)->nullable();
            $table->bigInteger('managed_by')->default(0)->nullable();
            $table->char('upload_status', 10)->default('PENDING')->nullable();
            $table->text('remarks')->nullable();
            $table->dateTime('cr_on')->nullable();
            $table->dateTime('mod_on')->nullable();
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
        Schema::dropIfExists('account_head_masters');
    }
};
