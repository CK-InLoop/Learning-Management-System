import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function VerifyEmail({ status }) {
    const { auth } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { post, processing } = useForm({});

    useEffect(() => {
        // If the user is already verified, redirect them to the dashboard
        if (auth.user?.email_verified_at) {
            window.location.href = '/dashboard';
        }
    }, [auth.user]);

    const resendVerification = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        post(route('verification.send'), {
            preserveScroll: true,
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await post(route('logout'));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <Head title="Verify Email" />

            <div className="w-full sm:max-w-md px-6 py-8 bg-white shadow-xl overflow-hidden sm:rounded-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                        <EnvelopeIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent a verification link to your email address
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                        <p>Please check your email and click on the verification link to continue.</p>
                        <p className="font-medium mt-1">{auth.user?.email}</p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="rounded-md bg-green-50 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        A new verification link has been sent to your email address.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={resendVerification}
                            disabled={isSubmitting || processing}
                            className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(isSubmitting || processing) ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {(isSubmitting || processing) ? (
                                <>
                                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                    Sending...
                                </>
                            ) : (
                                'Resend Verification Email'
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

                        <button
                            onClick={handleLogout}
                            disabled={processing}
                            className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign out
                        </button>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>Didn't receive the email? Check your spam folder or contact support if the problem persists.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
