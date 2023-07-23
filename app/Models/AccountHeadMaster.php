<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountHeadMaster extends Model
{
    use HasFactory;

    protected $table = 'account_head_master';

    protected $guarded = [];

    const CUSTOMER_TYPE = 3;
    const SUPPLIER_TYPE = 4;
}
