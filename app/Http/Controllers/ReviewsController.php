<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    public function create(Request $req){
        $req->validate([
            'review' => 'required|max:255',
            'rating' => 'required|integer|max:5|min:1',
            'event_id' => 'required|integer|exists:events,id'
        ]);

        $req->user()->review()->create($req->all());
        return back();
    }
}
