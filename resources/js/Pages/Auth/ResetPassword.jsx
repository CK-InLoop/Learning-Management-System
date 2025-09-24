import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function ResetPassword({ email, token }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.update'), {
            onFinish: () => {
                // Handle successful password reset
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            <Head title="Reset Password" />

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
                    <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
                    <p className="text-sm text-gray-600">Create a new password for your account</p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
                        {Object.values(errors).map((error, index) => (
                            <p key={index} className="mt-1 first:mt-0">{error}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <input type="hidden" name="token" value={data.token} />

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="you@example.com"
                                required
                                autoFocus
                                disabled={!!email}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.password ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="••••••••"
                                required
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
                        <p className="mt-1 text-xs text-gray-500">
                            Must be at least 8 characters long
                        </p>
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.password_confirmation ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                placeholder="••••••••"
                                required
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
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                processing ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {processing ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link 
                        href={route('login')} 
                        className="font-medium text-primary-600 hover:text-primary-500"
                    >
                        ← Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
