<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VoucherChild extends Model
{
    use HasFactory;
    use softDeletes;
    use setDefaultData;

    const DELETED_AT = 'r_status';

    protected $table = 'voucher_child';

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();
        self::created(function($model){
            $transaction_ref = TransactionRefMaster::create([

            ]);
        });

    }
}
