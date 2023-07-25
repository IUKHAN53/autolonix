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
        Schema::create('inventory_trans_master', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('inventory_trans_master_id')->nullable();
            $table->datetime('trans_date')->nullable();
            $table->enum('trans_type', ['Sales(SL)', 'SalesReturn(SR)', 'Purchase(PU)', 'PurchaseReturn(PR)'])->nullable();
            $table->bigInteger('trans_master_id')->comment('Purchase MasterID/Sales MasterID')->nullable();
            $table->bigInteger('trans_child_id')->comment('Purchase ChildID/Sales ChildID')->nullable();
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('unique_id')->nullable();
            $table->decimal('pack_qty', 18, 4)->nullable();
            $table->decimal('trans_qty', 18, 4)->nullable();
            $table->enum('trans_status', ['PENDING', 'ACTIVE', 'DELETED', 'POSTED', 'CANCELLED'])->default('ACTIVE')->nullable();
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
        Schema::dropIfExists('inventory_trans_master');
    }
};
