<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    protected $fillable = [
        'event_id',
        'user_id',
        'order_id',
        'redeemed',
        'uuid'
    ];

    public function event(){
        return $this->hasOne(\App\Models\Events::class, 'id');
    }

    public function user(){
        return $this->hasOne(\App\Models\User::class, 'user_id');
    }

    public function order(){
        return $this->hasOne(\App\Models\Orders::class, 'order_id');
    }

    use HasFactory;
}
