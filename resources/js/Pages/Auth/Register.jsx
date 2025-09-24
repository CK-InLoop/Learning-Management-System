import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            <Head title="Create an account" />

            <div className="w-full sm:max-w-md px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="mb-2">
                        <div className="w-16 h-16 text-primary-600">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="currentColor" />
                                <path d="M24 12L32 20L24 28L16 20L24 12Z" fill="white" />
                                <path d="M24 28L32 20H16L24 28Z" fill="#EFF6FF" />
                                <path d="M24 28V36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
                    <p className="text-sm text-gray-600">Join our learning community</p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
                        {Object.values(errors).map((error, index) => (
                            <p key={index} className="mt-1 first:mt-0">{error}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                autoComplete="name"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.name ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="new-password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.password ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                autoComplete="new-password"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.password_confirmation ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            I am a
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label 
                                className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
                                    data.role === 'student' 
                                        ? 'border-primary-500 bg-primary-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={data.role === 'student'}
                                    onChange={() => setData('role', 'student')}
                                    className="sr-only"
                                />
                                <div className="flex flex-col items-center">
                                    <svg className="w-8 h-8 mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">Student</span>
                                    <span className="text-xs text-gray-500 text-center mt-1">I want to learn new skills</span>
                                </div>
                            </label>
                            <label 
                                className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
                                    data.role === 'teacher' 
                                        ? 'border-primary-500 bg-primary-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={data.role === 'teacher'}
                                    onChange={() => setData('role', 'teacher')}
                                    className="sr-only"
                                />
                                <div className="flex flex-col items-center">
                                    <svg className="w-8 h-8 mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">Teacher</span>
                                    <span className="text-xs text-gray-500 text-center mt-1">I want to teach and create courses</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                processing ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={route('login')}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    By creating an account, you agree to our
                    <Link href="#" className="ml-1 text-primary-600 hover:text-primary-500">
                        Terms of Service
                    </Link> and
                    <Link href="#" className="ml-1 text-primary-600 hover:text-primary-500">
                        Privacy Policy
                    </Link>.
                </div>
            </div>
        </div>
    );
}
