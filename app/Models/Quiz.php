<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    protected $fillable = [
        'lesson_id',
        'question',
        'options',
        'correct_answer',
        'points',
    ];

    protected $casts = [
        'options' => 'array',
        'points' => 'integer',
    ];

    /**
     * Get the lesson that owns the quiz.
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * Get the quiz results for the quiz.
     */
    public function results(): HasMany
    {
        return $this->hasMany(QuizResult::class);
    }

    /**
     * Check if the user has taken this quiz.
     */
    public function isTakenBy(User $user): bool
    {
        return $this->results()->where('user_id', $user->id)->exists();
    }

    /**
     * Get the user's result for this quiz.
     */
    public function getUserResult(User $user)
    {
        return $this->results()->where('user_id', $user->id)->first();
    }
}
