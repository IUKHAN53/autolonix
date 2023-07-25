<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductChild extends Model
{
    use HasFactory;
    use softDeletes;
    use SetDefaultData;
    const DELETED_AT = 'r_status';

    protected $table = 'product_child';

    protected $fillable = [
        'product_child_id',
        'product_id',
        'unique_id',
        'pack_qty',
        'station_id',
        'qty_on_hand',
        'min_stock',
        'reorder_level',
        'max_stock',
        'reorder_qty',
        'average_cost',
        'last_purchase_cost',
        'it_amount1',
        'it_amount2',
        'it_amount3',
        'it_amount4',
        'it_rate1',
        'it_rate2',
        'it_rate3',
        'it_rate4',
        'last_supplier_id',
        'location',
        'r_status_c',
        'upload_status_c',
        'cr_by',
        'cr_on',
        'mod_by',
        'mod_on',
        'user_id',
    ];

    // Relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with ProductMaster model
    public function product()
    {
        return $this->belongsTo(ProductMaster::class);
    }
}
