<?php

namespace App\Traits;
use App\Models\GlobalSettings;

trait SetDefaultData
{
    protected static function booted()
    {
        static::creating(function ($model) {
            if(isset($model->attributesToArray()['cr_by'])) $model->cr_by = auth()->id();
            if(isset($model->attributesToArray()['cr_on'])) $model->cr_on = date('Y-m-d H:i:s');
            if(isset($model->attributesToArray()['upload_status_c'])) $model->upload_status_c = 0;
            $station_id = GlobalSettings::query()->where('type', 'station_id')->pluck('value')->first();
            if(isset($model->attributesToArray()['station_id'])) $model->station_id = $station_id;
            $model->save();
        });
        static::updating(function ($model) {
            if(isset($model->attributesToArray()['mod_by'])) $model->mod_by = auth()->id();
            if(isset($model->attributesToArray()['mod_on'])) $model->mod_on = date('Y-m-d H:i:s');
            $model->save();
        });
    }
}
