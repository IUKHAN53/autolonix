<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductChildPrice extends Model
{
    use HasFactory;
    use SetDefaultData;

    protected $table = 'product_child_prices';

    protected $fillable = [
        'product_child_price_id',
        'product_id',
        'unique_id',
        'price_level_id',
        'service_id',
        'unit_price',
        'ot_amount1',
        'ot_amount2',
        'ot_amount3',
        'ot_amount4',
        'ot_rate1',
        'ot_rate2',
        'ot_rate3',
        'ot_rate4',
        'upload_status_p',
        'cr_by',
        'cr_on',
        'mod_by',
        'mod_on',
        'station_id',
    ];


    public function product()
    {
        return $this->belongsTo(ProductMaster::class);
    }

}
