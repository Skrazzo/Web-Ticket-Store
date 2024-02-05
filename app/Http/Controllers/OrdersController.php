<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersController extends Controller
{
    

    public function index(Request $req){
        

        return Inertia::render('Orders', [
            'orders' => Orders::where('user_id', $req->user()->id)
                ->with('event:id,img_path,name,price') // from event table select ID (always have to be here), img_path, name, and price
                ->select('event_id', 'id', 'ticket_count', 'status', 'session_id', 'session_url') // from orders table select, event_id, ticket_count, status, and session_id
                ->orderBy('created_at', 'DESC')
                ->simplePaginate(16),

            'paid_count' => Orders::where([
                    ['user_id', $req->user()->id],
                    ['status', 1]
                ])->count(),

            'unpaid_count' => Orders::where([
                ['user_id', $req->user()->id],
                ['status', 0]
            ])->count()
        ]);
    }
}
