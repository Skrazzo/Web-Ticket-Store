<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    protected $fillable = [
        'genre_id',
        'location_id',
        'name',
        'description',
        'date',
        'time',
        'country',
        'city',
        'place',
        'price',
        'left_tickets',
        'img_path',
    ];

    public function genre(){
        return $this->belongsTo(\App\Models\Genres::class);
    }

    public function order(){
        return $this->hasMany(\App\Models\Orders::class);
    }

    public function ticket(){
        return $this->hasMany(\App\Models\Tickets::class);
    }

    public function review(){
        return $this->hasMany(\App\Models\Reviews::class);
    }

    use HasFactory;
}
