import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title="Forgot Password" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mb-6">
                    <span className="text-2xl font-bold text-primary-600">
                        LMS
                    </span>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password
                    reset link that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                required
                                autoFocus
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <a
                            href={route('login')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Back to login
                        </a>

                        <button
                            type="submit"
                            className="ml-4 btn"
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
