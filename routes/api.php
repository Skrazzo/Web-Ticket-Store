<?php

use App\Http\Controllers\OrdersController;
use App\Http\Controllers\TicketsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/images/{path}', function($path) {
    $imagePath = 'images/' . $path;
        
    if (Storage::exists($imagePath)) {
        $file = Storage::get($imagePath);
        $type = Storage::mimeType($imagePath);

        return response($file, 200)->header('Content-Type', $type);
    }

    return response()->json(['error' => 'Image not found.'], 404);
    
});


Route::get('/ticket/redeem/{uuid}', [TicketsController::class, 'redeem']);
