<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductDrilldownMaster extends Model
{
    use HasFactory;
    use SetDefaultData;

    protected $fillable = [
        'drilldown_id',
        'drilldown_type',
        'parent_id',
        'drilldown_code',
        'drilldown_description',
        'drilldown_description_arabic',
        'upload_status',
        'station_id',
        'drilldown_status',
        'drilldown_image',
        'cr_by',
        'cr_on',
        'mod_by',
        'mod_on',
    ];

    public function children()
    {
        return $this->hasMany(ProductDrilldownMaster::class, 'parent_id', 'drilldown_id');
    }

    public function getDrilldownImageAttribute($value): ?string
    {

        return $value ? Storage::url($value) : asset('assets/images/default_product.png');
    }

    public function scopeParent($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeChild($query)
    {
        return $query->whereNotNull('parent_id');
    }

    public function scopeCategory($query)
    {
        return $query->where('drilldown_type', 'Category');
    }

    public function scopeBrand($query)
    {
        return $query->where('drilldown_type', 'Brand');
    }

    public function scopeDepartment($query)
    {
        return $query->where('drilldown_type', 'Department');
    }

}
