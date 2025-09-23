import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ email, token }) {
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
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title="Reset Password" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mb-6">
                    <span className="text-2xl font-bold text-primary-600">
                        LMS
                    </span>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                    Enter your new password below to reset your password.
                </div>

                <form onSubmit={submit}>
                    <input type="hidden" name="token" value={data.token} />

                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
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

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            className="btn"
                            disabled={processing}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
