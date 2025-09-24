import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            <Head title="Log in" />

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
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-sm text-gray-600">Sign in to your account</p>
                </div>

                {status && (
                    <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md">
                        {status}
                    </div>
                )}

                {errors.email && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
                        {errors.email}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            {canResetPassword && (
                                <div className="text-sm">
                                    <Link href={route('password.request')} className="font-medium text-primary-600 hover:text-primary-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                autoComplete="current-password"
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
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                processing ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">New to LMS?</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={route('register')}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
