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
        Schema::create('transaction_ref_master', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('transaction_ref_id')->nullable();
            $table->bigInteger('transaction_voucher_id')->nullable();
            $table->bigInteger('paid_voucher_id')->nullable();
            $table->bigInteger('paid_account_id')->nullable();
            $table->string('ref_type', 25)->nullable();
            $table->decimal('amount', 19, 4)->nullable();
            $table->string('status', 15)->nullable();
            $table->dateTime('cheque_date')->nullable();
            $table->string('cheque_no', 50)->nullable();
            $table->string('cheque_details', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_ref_master');
    }
};
