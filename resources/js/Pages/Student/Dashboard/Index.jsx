import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ClockIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon as ClockOutline,
  VideoCameraIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Sample data - replace with actual data from your backend
const enrolledCourses = [
  {
    id: 1,
    title: 'Introduction to React',
    instructor: 'Jane Smith',
    progress: 75,
    nextLesson: 'State Management with Redux',
    dueDate: '2023-07-15',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    instructor: 'John Doe',
    progress: 30,
    nextLesson: 'Closures and Scope',
    dueDate: '2023-07-20',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'assignment',
    title: 'Submitted Assignment #3',
    course: 'Introduction to React',
    time: '2 hours ago',
    icon: DocumentTextIcon,
    iconColor: 'text-blue-500',
  },
  {
    id: 2,
    type: 'video',
    title: 'Watched: React Hooks Deep Dive',
    course: 'Introduction to React',
    time: '5 hours ago',
    icon: VideoCameraIcon,
    iconColor: 'text-purple-500',
  },
  {
    id: 3,
    type: 'quiz',
    title: 'Completed Quiz: JavaScript Basics',
    course: 'Advanced JavaScript',
    time: '1 day ago',
    icon: CheckCircleIcon,
    iconColor: 'text-green-500',
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: 'Project Submission',
    course: 'Introduction to React',
    dueDate: '2023-07-18',
    daysLeft: 3,
  },
  {
    id: 2,
    title: 'Mid-term Exam',
    course: 'Advanced JavaScript',
    dueDate: '2023-07-22',
    daysLeft: 7,
  },
];

export default function StudentDashboard({ auth }) {
  return (
    <DashboardLayout 
      user={auth.user} 
      header={
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, <span className="text-indigo-600">{auth.user.name.split(' ')[0]}</span>!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your courses today.
          </p>
        </div>
      }
    >
      <Head title="Student Dashboard" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Enrolled Courses</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">5</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">12</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <span className="sr-only">Increased by</span>3
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <ClockOutline className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">3</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Deadlines</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">2</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <span className="sr-only">Due soon</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">My Courses</h3>
              <p className="mt-1 text-sm text-gray-500">Continue your learning journey</p>
            </div>
            <div className="bg-white overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {enrolledCourses.map((course) => (
                  <li key={course.id} className="hover:bg-gray-50">
                    <a href={`/courses/${course.id}`} className="block">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                              <img 
                                className="h-full w-full object-cover" 
                                src={course.thumbnail} 
                                alt={course.title} 
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-indigo-600 truncate">{course.title}</p>
                              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                              <div className="mt-1">
                                <p className="text-xs text-gray-500">Next: {course.nextLesson}</p>
                              </div>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-600 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="ml-2 text-xs text-gray-500">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <a 
                  href="/courses" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View All Courses
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-2 ${activity.iconColor.replace('text-', 'bg-')} bg-opacity-10`}>
                      <activity.icon className={`h-5 w-5 ${activity.iconColor}`} aria-hidden="true" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.course}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <a 
                href="/activity" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all activity
              </a>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Deadlines</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-sm text-gray-500">{deadline.course}</p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>Due {deadline.dueDate}</p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        deadline.daysLeft <= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deadline.daysLeft} {deadline.daysLeft === 1 ? 'day' : 'days'} left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <a 
                href="/calendar" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
