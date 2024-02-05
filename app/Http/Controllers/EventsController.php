<?php

namespace App\Http\Controllers;

use App\Models\Genres;
use App\Models\Reviews;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Events;

class EventsController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard', [
            'events' => Events::with('genre:id,name')->whereNot('left_tickets', 0)->get(),
            'genres' => Genres::with('event')->select('id', 'name')->get()
        ]);
    }

    public function event_index($id){
        return Inertia::render('Event', [
            'event' => Events::findOrFail($id),
            'reviews' => Reviews::where('event_id', $id)->with('user:id,name')->simplePaginate(15),
            'avg_rating' => Reviews::where('event_id', $id)->avg('rating')
        ]);
    }

    public function admin_index(){
        return Inertia::render('Admin/Events', [
            'events' => Events::with('genre:id,name')->select('id','genre_id' , 'name', 'img_path', 'price')->simplePaginate(8),
            'genres' => Genres::with('event')->select('id', 'name')->get()
        ]);
    }

    public function search_index(Request $req){
        return Inertia::render('Search', [
            'search' => Events::whereNot('left_tickets', 0)->simplePaginate(16),
            'genres' => Genres::select('id', 'name')->get()
        ]);
    }

    public function search(Request $req){
        if($req['genre'] == 0){
            return Inertia::render('Search', [
                'search' => Events::where('name', 'LIKE', '%'. $req['title'] .'%')->whereNot('left_tickets', 0)->simplePaginate(16),
                'genres' => Genres::select('id', 'name')->get()
            ]);
        }

        return Inertia::render('Search', [
            'search' => Events::where([
                ['name', 'LIKE', '%'. $req['title'] .'%'],
                ['genre_id', $req['genre']]
            ])->whereNot('left_tickets', 0)->simplePaginate(16),
            'genres' => Genres::select('id', 'name')->get()
        ]);
    }

    public function admin_create(Request $req){
        $req->validate([
            'name' => 'required|max:20',
            'genre_id' => 'required|exists:genres,id',
            'image' => 'required|image|max:4096', // 4MB
            'description' => 'required|max:255',
            'date' => 'required|date|after:today',
            'time' => 'required|date_format:H:i',
            'country' => 'required|max:20',
            'city' => 'required|max:25',
            'place' => 'required|max:25',
            'price' => 'required|decimal:0,2|min:0.01',
            'left_tickets' => 'required|integer|min:1',
            
        ]);

        $path = $req->file('image')->store('images');
        $req['img_path'] = $path;

        $genre = Genres::findOrFail($req['genre_id']);
        $genre->event()->create($req->all());
        return back();
    }
}
