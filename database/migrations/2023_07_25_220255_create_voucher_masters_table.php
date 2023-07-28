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
        Schema::create('voucher_master', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('voucher_master_id')->nullable();
            $table->bigInteger('voucher_type_id')->nullable();
            $table->bigInteger('auto_voucher_no')->nullable();
            $table->string('manual_voucher_no', 50)->nullable();
            $table->string('voucher_prefix', 50)->nullable();
            $table->dateTime('voucher_date')->nullable();
            $table->dateTime('entered_date')->nullable();
            $table->string('ref_no', 50)->nullable();
            $table->decimal('voucher_amount', 19, 4)->nullable();
            $table->string('remark', 250)->nullable();
            $table->enum('post_status', ['PENDING', 'POSTED', 'CANCELLED'])->nullable();
            $table->string('creation_mode', 50)->nullable();
            $table->bigInteger('staff_id')->nullable();
            $table->bigInteger('voucher_posted_id')->nullable();
            $table->bigInteger('station_id')->nullable();
            $table->dateTime('cr_on')->nullable();
            $table->string('cr_by', 50)->nullable();
            $table->dateTime('mod_on')->nullable();
            $table->string('mod_by', 50)->nullable();
            $table->string('counter_close_no', 15)->nullable();
            $table->timestamp('r_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_masters');
    }
};
