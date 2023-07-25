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
            $table->bigInteger('voucher_child_id');
            $table->bigInteger('voucher_master_id');
            $table->bigInteger('account_id');
            $table->decimal('cr_amount', 19, 4);
            $table->decimal('dr_amount', 19, 4);
            $table->decimal('os_balance', 19, 4);
            $table->string('narration', 250);
            $table->string('post_status', 50);
            $table->dateTime('cr_on');
            $table->string('cr_by', 50);
            $table->dateTime('mod_on');
            $table->string('mod_by', 50);
            $table->timestamp('r_status');
            $table->string('payment_mode', 15);
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
