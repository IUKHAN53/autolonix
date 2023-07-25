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
        Schema::create('voucher_type_master', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('voucher_type_id')->nullable();
            $table->string('voucher_type_id_string', 50)->nullable();
            $table->string('voucher_name', 50)->nullable();
            $table->string('voucher_name_alias', 50)->nullable();
            $table->string('voucher_prefix', 50)->nullable();
            $table->string('no_method', 50)->nullable();
            $table->dateTime('voucher_no_rest_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_type_masters');
    }
};
