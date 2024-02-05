<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('genre_id')->constrained();
            $table->string('name', 50);
            $table->text('description');
            $table->date('date');
            $table->time('time');
            $table->string('country', 50);
            $table->string('city', 50);
            $table->string('place', 50);
            $table->decimal('price', 8, 2, true);
            $table->text('img_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
