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
            $table->bigInteger('voucher_master_id');
            $table->bigInteger('voucher_type_id');
            $table->bigInteger('auto_voucher_no');
            $table->string('manual_voucher_no', 50);
            $table->string('voucher_prefix', 50);
            $table->dateTime('voucher_date');
            $table->dateTime('entered_date');
            $table->string('ref_no', 50);
            $table->decimal('voucher_amount', 19, 4);
            $table->string('remark', 250);
            $table->enum('post_status', ['PENDING', 'POSTED', 'CANCELLED']); // Replace with actual enum values
            $table->string('creation_mode', 50);
            $table->bigInteger('voucher_posted_id');
            $table->bigInteger('station_id');
            $table->dateTime('cr_on');
            $table->string('cr_by', 50);
            $table->dateTime('mod_on');
            $table->string('mod_by', 50);
            $table->string('counter_close_no', 15);
            $table->timestamp('r_status');
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
