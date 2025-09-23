<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'progress',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'progress' => 'integer',
    ];

    /**
     * Get the user that owns the enrollment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the course that owns the enrollment.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Mark the course as completed.
     */
    public function markAsCompleted(): void
    {
        $this->update([
            'progress' => 100,
            'completed_at' => now(),
        ]);
    }

    /**
     * Update the progress of the course.
     */
    public function updateProgress(int $progress): void
    {
        $this->update(['progress' => min(100, max(0, $progress))]);
    }
}
