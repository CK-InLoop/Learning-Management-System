<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'bio',
        'phone',
        'address',
        'is_online',
        'last_seen',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_online' => 'boolean',
            'last_seen' => 'datetime',
        ];
    }

    /**
     * Get the courses taught by the teacher.
     */
    public function teachingCourses(): HasMany
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    /**
     * The courses that the user is enrolled in.
     */
    public function enrolledCourses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'enrollments')
            ->withPivot('progress', 'completed_at')
            ->withTimestamps();
    }

    /**
     * Get the user's quiz results.
     */
    public function quizResults(): HasMany
    {
        return $this->hasMany(QuizResult::class);
    }

    /**
     * Get the user's payments.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get the user's certificates.
     */
    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    /**
     * Check if the user is a teacher.
     */
    public function isTeacher(): bool
    {
        return $this->hasRole('teacher');
    }

    /**
     * Check if the user is a student.
     */
    public function isStudent(): bool
    {
        return $this->hasRole('student');
    }

    /**
     * Get the user's progress in a course.
     */
    public function getCourseProgress(Course $course): int
    {
        $enrollment = $this->enrolledCourses()->where('course_id', $course->id)->first();
        return $enrollment ? $enrollment->pivot->progress : 0;
    }

    /**
     * Check if the user is enrolled in a course.
     */
    public function isEnrolled(Course $course): bool
    {
        return $this->enrolledCourses()->where('course_id', $course->id)->exists();
    }
}
