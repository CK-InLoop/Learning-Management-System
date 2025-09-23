<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Course Permissions
            'view courses',
            'create courses',
            'edit courses',
            'delete courses',
            'publish courses',
            'enroll courses',
            
            // Lesson Permissions
            'view lessons',
            'create lessons',
            'edit lessons',
            'delete lessons',
            
            // Quiz Permissions
            'view quizzes',
            'create quizzes',
            'edit quizzes',
            'delete quizzes',
            'take quizzes',
            
            // User Management
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Category Management
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',
            
            // Enrollment Management
            'view enrollments',
            'create enrollments',
            'delete enrollments',
            
            // Payment Management
            'view payments',
            'process payments',
            'refund payments',
            
            // Certificate Management
            'view certificates',
            'generate certificates',
            'revoke certificates',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $teacherPermissions = [
            'view courses', 'create courses', 'edit courses', 'publish courses',
            'view lessons', 'create lessons', 'edit lessons', 'delete lessons',
            'view quizzes', 'create quizzes', 'edit quizzes', 'delete quizzes',
            'view categories', 'view enrollments', 'view payments',
            'view certificates', 'generate certificates'
        ];
        
        $teacherRole = Role::create(['name' => 'teacher']);
        $teacherRole->givePermissionTo($teacherPermissions);

        $studentRole = Role::create(['name' => 'student']);
        $studentRole->givePermissionTo([
            'view courses', 'enroll courses', 'view lessons', 
            'view quizzes', 'take quizzes', 'view certificates'
        ]);

        // Create admin user
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@lms.test',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');

        // Create a sample teacher
        $teacher = User::create([
            'name' => 'John Doe',
            'email' => 'teacher@lms.test',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $teacher->assignRole('teacher');

        // Create a sample student
        $student = User::create([
            'name' => 'Jane Smith',
            'email' => 'student@lms.test',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $student->assignRole('student');
    }
}
