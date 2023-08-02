<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseChild extends Model
{
    use HasFactory;
    use softDeletes;
    use SetDefaultData;

    const DELETED_AT = 'r_status';

    protected $table = 'purchase_child';

    protected $guarded = [];


    public function inventory_trans_master()
    {
        return $this->hasMany(InventoryTransMaster::class, 'purchase_child_id', 'trans_master_id');
    }
}
