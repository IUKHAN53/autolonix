<?php

namespace App\Traits;
use App\Models\GlobalSettings;

trait SetDefaultData
{
    protected static function booted()
    {
//        static::creating(function ($model) {
//            $model->cr_by = auth()->id();
//            $model->cr_on = date('Y-m-d H:i:s');
//            $model->upload_status_c = 0;
//            $station_id = GlobalSettings::query()->where('type', 'station_id')->pluck('value')->first();
//            $model->station_id = $station_id;
//        });
//        static::updating(function ($model) {
//            $model->mod_by = auth()->id();
//            $model->mod_on = date('Y-m-d H:i:s');
//        });
    }
}
