<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    protected $fillable = [
        'user_id',
        'event_id',
        'review',
        'rating'
    ];

    public function user(){
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function event(){
        return $this->belongsTo(\App\Models\Events::class, 'event_id');
    }

    use HasFactory;
}
