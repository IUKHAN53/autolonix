<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VoucherMaster extends Model
{
    use HasFactory;
    use softDeletes;
    use setDefaultData;

    const DELETED_AT = 'r_status';
    protected $table = 'voucher_master';

    protected $guarded = [];
}
