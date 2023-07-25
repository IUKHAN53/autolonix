<?php

namespace App\Traits;
trait SetDefaultData
{
    protected static function booted()
    {
        static::creating(function ($model) {
            if(isset($model->attributesToArray()['cr_by'])) $model->cr_by = auth()->id();
            if(isset($model->attributesToArray()['cr_on'])) $model->cr_on = date('Y-m-d H:i:s');
            if(isset($model->attributesToArray()['upload_status_c'])) $model->upload_status_c = 0;
            if(isset($model->attributesToArray()['station_id'])) $model->station_id = getStationId();
        });
        static::updating(function ($model) {
            if(isset($model->attributesToArray()['mod_by'])) $model->mod_by = auth()->id();
            if(isset($model->attributesToArray()['mod_on'])) $model->mod_on = date('Y-m-d H:i:s');
        });
    }
}
