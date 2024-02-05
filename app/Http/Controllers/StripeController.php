<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Orders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StripeController extends Controller
{
    
    public function index(){

    }

    public function checkout(Request $req){
        $ticket_left = Events::findOrFail($req['event_id'])['left_tickets'];
        
        $req->validate([
            'amount' => 'required|integer|min:1|max:' . $ticket_left,
            'event_id' => 'required|integer|exists:events,id'
        ]);

        

        $event = Events::find($req->event_id);
        $session_id = \Illuminate\Support\Str::uuid();

        \Stripe\Stripe::setApiKey(config('stripe.sk'));
        $session = \Stripe\Checkout\Session::create([
            'line_items'  => [
                [
                    'price_data' => [
                        'currency'     => 'eur',
                        'product_data' => [
                            'name' => $event['name'],
                        ],
                        'unit_amount'  => $event['price'] * 100,
                    ],
                    'quantity'   => $req->amount,
                ],
            ],
            'mode'        => 'payment',
            'success_url' => route('event.buy.success', $session_id),
            'cancel_url'  => route('orders'),
        ]);
        
        Orders::create([
            'event_id' => $event->id,
            'user_id' => $req->user()->id,
            'session_url' => $session->url,
            'session_id' => $session_id,            
            'ticket_count' => $req->amount,
            'status' => 0
        ]);

        $event->left_tickets -= $req->amount;
        $event->save();

        return Inertia::Render('Tickets/CheckoutRedirection', [
            'redirect_link' => $session->url
        ]);
    }

    public function success($id){
        $order = Orders::where('session_id', $id)->first();

        if(!$order) {
            return response('Not found', 404);
        }

        if($order->status == 1){
            return response('Forbidden', 403);
        }

        $order->status = 1;
        $order->save();

        // create tickets
        for($i = 0; $i < $order->ticket_count; $i++){
            $order->ticket()->create([
                'event_id'  => $order->event_id,
                'user_id'   => $order->user_id,
                'order_id'  => $order->id,
                'redeemed'  => false,
                'uuid'      => \Illuminate\Support\Str::uuid()
            ]);
        }

        return redirect('orders');
    }
}
