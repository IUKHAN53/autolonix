<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductMaster extends Model
{
    use HasFactory;

    protected $table = 'product_masters';
    protected $fillable = [
        'product_id',
        'product_code',
        'barcode',
        'product_name',
        'product_name_arabic',
        'specification',
        'category_id',
        'sub_category_id',
        'sub_sub_category_id',
        'product_brand_id',
        'department_id',
        'unit',
        'pack_qty',
        'pack_details',
        'is_master',
        'stock_type',
        'product_status',
        'unique_id',
        'substitute_no',
        'model',
        'engine_no',
        'chassis_no',
        'ome_code',
        'r_status_m',
        'remarks',
        'upload_status',
        'product_type',
        'product_image',
        'cr_by',
        'cr_on',
        'mod_by',
        'mod_on',
        'user_id',
    ];

    const UOM = ['Packet', 'Kg', 'Ltr', 'Mtr', 'Set', 'Box', 'Bag', 'Roll', 'Bundle', 'Pair', 'Dozen', 'Nos', 'Unit', 'Others'];

    // Relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with ProductDetail model

}
