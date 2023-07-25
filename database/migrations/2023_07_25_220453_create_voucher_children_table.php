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
        Schema::create('voucher_child', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('voucher_child_id')->nullable();
            $table->bigInteger('voucher_master_id')->nullable();
            $table->bigInteger('account_id')->nullable();
            $table->decimal('cr_amount', 19, 4)->nullable();
            $table->decimal('dr_amount', 19, 4)->nullable();
            $table->decimal('os_balance', 19, 4)->nullable();
            $table->string('narration', 250)->nullable();
            $table->string('post_status', 50)->nullable();
            $table->dateTime('cr_on')->nullable();
            $table->string('cr_by', 50)->nullable();
            $table->dateTime('mod_on')->nullable();
            $table->string('mod_by', 50)->nullable();
            $table->timestamp('r_status')->nullable();
            $table->string('payment_mode', 15)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_child');
    }
};
