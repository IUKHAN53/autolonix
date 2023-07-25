<?php

namespace App\Models;

use App\Traits\SetDefaultData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryTransMaster extends Model
{
    use HasFactory;
    use SetDefaultData;

    protected $table = 'inventory_trans_master';

    protected $guarded = [];


}
