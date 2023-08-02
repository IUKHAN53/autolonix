<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseMaster extends Model
{
    use HasFactory;
    use softDeletes;
    use SetDefaultData;

    const DELETED_AT = 'r_status';

    protected $table = 'purchase_master';

    protected $guarded = [];

    public function supplier()
    {
        return $this->belongsTo(AccountHeadMaster::class, 'supplier_id', 'account_id', );
    }

    public function purchase_child()
    {
        return $this->hasMany(PurchaseChild::class, 'purchase_id', 'purchase_id');
    }

    public function inventory_trans_master()
    {
        return $this->hasOne(InventoryTransMaster::class,'inventory_trans_master_id', 'purchase_id');
    }

    public function voucher_master()
    {
        return $this->hasOne(VoucherMaster::class, 'voucher_posted_id', 'purchase_id');
    }

}
