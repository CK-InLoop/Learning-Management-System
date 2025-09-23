<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_students' => User::role('student')->count(),
            'total_teachers' => User::role('teacher')->count(),
            'total_courses' => Course::count(),
            'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
            'recent_enrollments' => Enrollment::with(['user', 'course'])
                ->latest()
                ->take(5)
                ->get(),
            'recent_payments' => Payment::with(['user', 'course'])
                ->where('status', 'completed')
                ->latest()
                ->take(5)
                ->get(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
