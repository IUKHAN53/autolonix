<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountHeadMaster extends Model
{
    use HasFactory;
    use SetDefaultData;

    protected $table = 'account_head_masters';

    protected $guarded = [];


}
