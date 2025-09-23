<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('quiz_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('answer');
            $table->boolean('is_correct');
            $table->integer('score_obtained');
            $table->timestamps();
            
            $table->unique(['quiz_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('quiz_results');
    }
};
