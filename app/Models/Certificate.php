<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'certificate_number',
        'pdf_url',
        'issue_date',
        'expiry_date',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];

    /**
     * Get the user that owns the certificate.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the course that the certificate is for.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Check if the certificate is expired.
     */
    public function isExpired(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }

    /**
     * Generate a unique certificate number.
     */
    public static function generateCertificateNumber(): string
    {
        return 'CERT-' . now()->format('Ymd') . '-' . strtoupper(uniqid());
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted()
    {
        static::creating(function ($certificate) {
            if (empty($certificate->certificate_number)) {
                $certificate->certificate_number = static::generateCertificateNumber();
            }
            if (empty($certificate->issue_date)) {
                $certificate->issue_date = now();
            }
        });
    }
}
