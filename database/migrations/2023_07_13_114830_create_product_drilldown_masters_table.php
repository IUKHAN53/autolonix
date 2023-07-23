<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_drilldown_masters', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('drilldown_id')->nullable();
            $table->string('drilldown_type', 50);
            $table->integer('parent_id')->nullable();
            $table->string('drilldown_code', 50);
            $table->string('drilldown_description', 300);
            $table->text('drilldown_description_arabic')->nullable();
            $table->string('upload_status', 50)->nullable();
            $table->bigInteger('station_id')->nullable();
            $table->string('drilldown_status', 20)->nullable();
            $table->string('drilldown_image')->nullable();
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
        Schema::dropIfExists('product_drilldown_masters');
    }
};
