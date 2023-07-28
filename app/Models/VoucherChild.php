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
            if($model->os_balance > 0){
                $transaction_ref = TransactionRefMaster::create([
                    'transaction_ref_id' => getMaxId('transaction_ref_master', 'transaction_ref_id'),
                    'transaction_voucher_id' => $model->voucher_master_id,
                    'paid_voucher_id' => $model->voucher_master_id,
                    'paid_account_id' => $model->account_id,
                    'ref_type' => 'NEW REF',
                    'amount' => $model->os_balance,
                    'status' => 'PENDING',
                    'cheque_date' => '',
                    'cheque_no' => '',
                    'cheque_details' => '',
                ]);
            }
        });

    }
}
