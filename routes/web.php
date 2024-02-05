<?php


use App\Http\Controllers\EventsController;
use App\Http\Controllers\GenresController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\TicketsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('login');
});


Route::middleware('auth')->group(function () {
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::prefix('tickets')->group(function (){ // tickets
        Route::get('/manage', [TicketsController::class, 'manage_index'])->name('tickets.manage');
        Route::get('/{id}', [TicketsController::class, 'create_ticket'])->name('ticket.create');
    });
    
    Route::get('/events', [EventsController::class, 'index'])->name('dashboard');
    Route::prefix('event')->group(function () { // event
        Route::get('/{id}', [EventsController::class, 'event_index'])->name('event');
        Route::post('/review', [ReviewsController::class, 'create'])->name('event.create.review');
        Route::post('/buy', [StripeController::class, 'checkout'])->name('event.buy');
        Route::get('/buy/success/{id}', [StripeController::class, 'success'])->name('event.buy.success');
    });
    
    Route::get('/search', [EventsController::class, 'search_index'])->name('search.index');
    Route::post('/search', [EventsController::class, 'search'])->name('search');

    Route::prefix('orders')->group(function () {
        Route::get('/', [OrdersController::class, 'index'])->name('orders');
    });
});

Route::middleware('admin')->group(function () {
    Route::prefix('admin')->group(function (){ // admin
        Route::get('/events', [EventsController::class, 'admin_index'])->name('admin.events');
        Route::post('/events', [EventsController::class, 'admin_create'])->name('admin.events.create');
        Route::post('/genres', [GenresController::class, 'admin_create'])->name('admin.genre.create');
        Route::delete('/genres/{id}', [GenresController::class, 'admin_delete'])->name('admin.genre.delete');
    });

});



require __DIR__.'/auth.php';
