<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountsParameter extends Model
{
    use HasFactory;
    use SetDefaultData;

    protected $guarded = [];


}
