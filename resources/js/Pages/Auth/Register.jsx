import { Head, Link } from '@inertiajs/react';

export default function Register() {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title="Register" />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex justify-center mb-6">
                    <Link href="/" className="text-2xl font-bold text-primary-600">
                        LMS
                    </Link>
                </div>

                <form>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoComplete="name"
                                autoFocus
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
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
                                autoComplete="new-password"
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                autoComplete="new-password"
                                className="block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Register as
                        </label>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                                <input
                                    id="student"
                                    name="role"
                                    type="radio"
                                    value="student"
                                    defaultChecked
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                />
                                <label htmlFor="student" className="ml-2 block text-sm text-gray-700">
                                    Student
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="teacher"
                                    name="role"
                                    type="radio"
                                    value="teacher"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                />
                                <label htmlFor="teacher" className="ml-2 block text-sm text-gray-700">
                                    Teacher
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route('login')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Already registered?
                        </Link>

                        <button
                            type="submit"
                            className="ml-4 btn"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
