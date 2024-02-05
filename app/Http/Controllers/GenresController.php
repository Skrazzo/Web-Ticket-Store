<?php

namespace App\Http\Controllers;

use App\Models\Genres;
use Illuminate\Http\Request;

class GenresController extends Controller
{
    public function admin_create(Request $req){
        $req->validate([
            'name' => 'required|max:50|unique:genres,name',
        ]);

        Genres::create($req->all());
        return back();
    }

    public function admin_delete($id){
        $genre = Genres::find($id);
        $genre->event()->delete();
        $genre->delete();
        return back();
    }

    
}
