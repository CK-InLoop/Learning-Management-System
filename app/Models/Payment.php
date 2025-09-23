<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'amount',
        'payment_method',
        'transaction_id',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    /**
     * Get the user that owns the payment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the course that was paid for.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Mark the payment as completed.
     */
    public function markAsCompleted(string $transactionId = null): void
    {
        $this->update([
            'status' => 'completed',
            'transaction_id' => $transactionId ?? $this->transaction_id,
        ]);
    }

    /**
     * Mark the payment as failed.
     */
    public function markAsFailed(string $transactionId = null): void
    {
        $this->update([
            'status' => 'failed',
            'transaction_id' => $transactionId ?? $this->transaction_id,
        ]);
    }

    /**
     * Mark the payment as refunded.
     */
    public function markAsRefunded(): void
    {
        $this->update(['status' => 'refunded']);
    }
}
