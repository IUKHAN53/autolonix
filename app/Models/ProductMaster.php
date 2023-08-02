<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class ProductMaster extends Model
{
    use HasFactory;
    use softDeletes;
    use SetDefaultData;

    const DELETED_AT = 'r_status';

    protected $table = 'product_masters';
    protected $guarded = [];

    const UOM = [
        'PCS',
        'KiloGram',
        'LT',
        'PACK',
    ];

    const PRODUCT_TYPE = [
        'STOCK',
        'NONSTOCK',
    ];

    public function getProductImageAttribute($value): ?string
    {
        return $value ? Storage::url($value) : asset('assets/images/default_product.png');
    }

    public function getUom()
    {
        return self::UOM;
    }

    // Relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductDrilldownMaster::class, 'category_id');
    }

    public function subCategory()
    {
        return $this->belongsTo(ProductDrilldownMaster::class, 'sub_category_id', 'drilldown_id');
    }

    public function subSubCategory()
    {
        return $this->belongsTo(ProductDrilldownMaster::class, 'sub_sub_category_id', 'drilldown_id');
    }

    public function brand()
    {
        return $this->belongsTo(ProductDrilldownMaster::class, 'product_brand_id', 'drilldown_id');
    }

    public function department()
    {
        return $this->belongsTo(ProductDrilldownMaster::class, 'department_id', 'drilldown_id');
    }

    public function child()
    {
        return $this->hasMany(ProductChild::class, 'product_id','product_id');
    }

    public function childPrice()
    {
        return $this->hasMany(ProductChildPrice::class, 'product_id','product_id');
    }

}
