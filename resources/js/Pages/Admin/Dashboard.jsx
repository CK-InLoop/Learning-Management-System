import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    UserGroupIcon, 
    BookOpenIcon, 
    CurrencyDollarIcon, 
    ChartBarIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';

const stats = [
    { 
        id: 1, 
        name: 'Total Students', 
        stat: '2,345', 
        icon: UserGroupIcon, 
        change: '12%', 
        changeType: 'increase',
        description: 'Total number of enrolled students'
    },
    { 
        id: 2, 
        name: 'Total Courses', 
        stat: '124', 
        icon: BookOpenIcon, 
        change: '5.4%', 
        changeType: 'increase',
        description: 'Total number of available courses'
    },
    { 
        id: 3, 
        name: 'Total Teachers', 
        stat: '45', 
        icon: AcademicCapIcon, 
        change: '3.2%', 
        changeType: 'increase',
        description: 'Total number of teachers'
    },
    { 
        id: 4, 
        name: 'Monthly Revenue', 
        stat: '$24,567', 
        icon: CurrencyDollarIcon, 
        change: '2.3%', 
        changeType: 'decrease',
        description: 'Revenue for the current month'
    },
];

const recentEnrollments = [
    { id: 1, student: 'John Doe', course: 'Introduction to React', date: '2023-06-15', status: 'active' },
    { id: 2, student: 'Jane Smith', course: 'Advanced JavaScript', date: '2023-06-14', status: 'active' },
    { id: 3, student: 'Bob Johnson', course: 'Laravel for Beginners', date: '2023-06-13', status: 'pending' },
    { id: 4, student: 'Alice Williams', course: 'UI/UX Design', date: '2023-06-12', status: 'active' },
    { id: 5, student: 'Charlie Brown', course: 'DevOps Fundamentals', date: '2023-06-11', status: 'completed' },
];

const recentPayments = [
    { id: 1, student: 'John Doe', amount: '$99.00', course: 'Introduction to React', date: '2023-06-15', status: 'completed' },
    { id: 2, student: 'Jane Smith', amount: '$149.00', course: 'Advanced JavaScript', date: '2023-06-14', status: 'completed' },
    { id: 3, student: 'Alice Williams', amount: '$199.00', course: 'UI/UX Design', date: '2023-06-12', status: 'completed' },
];

export default function AdminDashboard() {
    return (
        <DashboardLayout 
            title="Admin Dashboard" 
            header="Dashboard Overview"
            user={{ role: 'admin' }}
        >
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3">
                                <div className="text-sm">
                                    <span className={`font-medium ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.changeType === 'increase' ? (
                                            <span className="inline-flex items-center">
                                                <ArrowUpIcon className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                {item.change}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center">
                                                <ArrowDownIcon className="-ml-1 mr-0.5 h-4 w-4 text-red-500" />
                                                {item.change}
                                            </span>
                                        )}
                                    </span>{' '}
                                    <span className="text-gray-500">vs last month</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Enrollments */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Enrollments</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest student course enrollments</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Course
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentEnrollments.map((enrollment) => (
                                        <tr key={enrollment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {enrollment.student}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {enrollment.course}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {enrollment.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    enrollment.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Previous
                                </a>
                                <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Previous</span>
                                            {/* Heroicon name: solid/chevron-left */}
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href="#" aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            1
                                        </a>
                                        <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            2
                                        </a>
                                        <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            3
                                        </a>
                                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Next</span>
                                            {/* Heroicon name: solid/chevron-right */}
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Payments */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Payments</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest successful transactions</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Course
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {payment.student}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.course}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                {payment.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Previous
                                </a>
                                <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Previous</span>
                                            {/* Heroicon name: solid/chevron-left */}
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href="#" aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            1
                                        </a>
                                        <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            2
                                        </a>
                                        <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                            3
                                        </a>
                                        <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                            <span className="sr-only">Next</span>
                                            {/* Heroicon name: solid/chevron-right */}
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Stats</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Key metrics at a glance</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Monthly Active Users
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    1,234
                                </dd>
                                <dd className="mt-1 text-sm text-gray-600">
                                    <span className="text-green-600 font-medium">+12.5% </span>
                                    <span>from last month</span>
                                </dd>
                            </div>
                            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Course Completion Rate
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    78.9%
                                </dd>
                                <dd className="mt-1 text-sm text-gray-600">
                                    <span className="text-green-600 font-medium">+3.2% </span>
                                    <span>from last month</span>
                                </dd>
                            </div>
                            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Avg. Time on Platform
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    24 min
                                </dd>
                                <dd className="mt-1 text-sm text-gray-600">
                                    <span className="text-red-600 font-medium">-2.1% </span>
                                    <span>from last month</span>
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
