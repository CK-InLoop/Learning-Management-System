import { Head, Link } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title="Log in" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mb-6">
                    <Link href="/" className="text-2xl font-bold text-primary-600">
                        LMS
                    </Link>
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoComplete="username"
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-primary-600 hover:text-primary-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('register')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Don't have an account?
                        </Link>

                        <button
                            type="submit"
                            className="ml-4 btn"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
