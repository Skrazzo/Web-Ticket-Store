<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\Tickets;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TicketsController extends Controller
{
    public function redeem($uuid){
        $ticket = Tickets::where('uuid', $uuid)->first();
        if(!$ticket){
            return Inertia::render('Tickets/NotFound');
        }
        
        if($ticket->redeemed){
            return Inertia::render('Tickets/Invalid');
        }

        $ticket->redeemed = true;
        $ticket->save();
        
        return Inertia::render('Tickets/Redeemed');
    }

    public function create_ticket($id, Request $req){

        if(!$req->user()->id == Orders::findOrFail($id)->user_id) return response('Forbidden', 403);
        

        $event = Orders::findOrFail($id)->event()->first();
        $ticket_uuids = Tickets::where('order_id', $id)->get('uuid');

        
        

        $pdf = PDF::loadView('ticket', [
            'event' => $event,
            'uuids' => $ticket_uuids,
        ]);

        return response($pdf->output())
            ->header(
                'Content-Type',
                'application/pdf'
            )
            ->header('Content-Disposition', 'attachment; filename="ticket.pdf"');
        
    }

    public function manage_index(){
        return Inertia::render('Tickets/Manage');
    }
}
