<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizResult extends Model
{
    protected $fillable = [
        'quiz_id',
        'user_id',
        'answer',
        'is_correct',
        'score_obtained',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'score_obtained' => 'integer',
    ];

    /**
     * Get the quiz that owns the result.
     */
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Get the user that owns the result.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the course through the quiz and lesson relationship.
     */
    public function course()
    {
        return $this->quiz->lesson->course;
    }
}
