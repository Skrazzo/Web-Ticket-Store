<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genres extends Model
{
    protected $fillable = [
        'name'
    ];

    public function event(){
        return $this->hasMany(\App\Models\Events::class, 'genre_id');
    }

    use HasFactory;
}
