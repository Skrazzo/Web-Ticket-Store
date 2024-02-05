<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = [
        'user_id',
        'event_id',
        'ticket_count',
        'status',
        'session_id',
        'session_url'
    ];

    public function event(){
        return $this->belongsTo(\App\Models\Events::class, 'event_id');
    }

    public function user(){
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function ticket(){
        return $this->belongsTo(\App\Models\Tickets::class);
    }

    use HasFactory;
}
