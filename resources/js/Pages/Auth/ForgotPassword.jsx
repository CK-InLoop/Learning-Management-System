import { Head, Link, useForm } from '@inertiajs/react';
import { EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <Head title="Forgot Password" />

            <div className="w-full sm:max-w-md px-6 py-8 bg-white shadow-xl overflow-hidden sm:rounded-2xl transition-all duration-200">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                        <EnvelopeIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        We'll send you a link to reset your password
                    </p>
                </div>

                {status && (
                    <div className="mb-6 rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {status}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                {Object.values(errors).map((error, index) => (
                                    <p key={index} className="text-sm text-red-700">
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                    <p>Enter the email address associated with your account and we'll email you a password reset link.</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`block w-full pl-10 pr-3 py-2.5 border ${
                                    errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                } rounded-lg shadow-sm focus:outline-none sm:text-sm transition duration-150`}
                                placeholder="you@example.com"
                                required
                                autoFocus
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                                processing ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-y-0.5'
                            }`}
                        >
                            {processing ? (
                                <>
                                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                    Sending reset link...
                                </>
                            ) : (
                                'Send Password Reset Link'
                            )}
                        </button>

                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>

                        <Link 
                            href={route('login')} 
                            className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 hover:shadow-sm"
                        >
                            Back to sign in
                        </Link>
                    </div>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>Remember your password?{' '}
                        <Link 
                            href={route('login')} 
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
