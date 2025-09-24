import { Head, Link } from '@inertiajs/react';
import { 
  PlayIcon,
  ClockIcon,
  BookOpenIcon,
  CheckCircleIcon,
  UserGroupIcon,
  StarIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/Layouts/DashboardLayout';

// Sample data - replace with actual data from your backend
const courseData = {
  id: 1,
  title: 'Introduction to React',
  instructor: {
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Senior Frontend Developer with 8+ years of experience in React and modern JavaScript.'
  },
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Learn the fundamentals of React including components, state, props, and hooks. Build modern web applications with the most popular JavaScript library.',
  rating: 4.7,
  students: 1245,
  duration: '12 hours',
  lessons: 45,
  level: 'Beginner',
  category: 'Web Development',
  lastUpdated: '2023-06-15',
  enrolled: true,
  progress: 65,
  modules: [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Introduction to React and its core concepts',
      lessons: [
        { id: 1, title: 'Introduction to React', type: 'video', duration: '12:45', completed: true },
        { id: 2, title: 'Setting up your development environment', type: 'video', duration: '08:30', completed: true },
        { id: 3, title: 'Understanding JSX', type: 'video', duration: '15:20', completed: true },
        { id: 4, title: 'Your first React component', type: 'video', duration: '18:10', completed: true },
        { id: 5, title: 'Quiz: React Basics', type: 'quiz', duration: '10:00', completed: true },
      ]
    },
    {
      id: 2,
      title: 'Components and Props',
      description: 'Learn how to create and use components',
      lessons: [
        { id: 6, title: 'Functional vs Class Components', type: 'video', duration: '14:25', completed: true },
        { id: 7, title: 'Understanding Props', type: 'video', duration: '16:40', completed: true },
        { id: 8, title: 'Component Composition', type: 'video', duration: '12:15', completed: true },
        { id: 9, title: 'Assignment: Build a component', type: 'assignment', duration: '30:00', completed: false },
      ]
    },
    {
      id: 3,
      title: 'State and Lifecycle',
      description: 'Managing state and component lifecycle',
      lessons: [
        { id: 10, title: 'Introduction to State', type: 'video', duration: '20:15', completed: true },
        { id: 11, title: 'setState and useState', type: 'video', duration: '22:30', completed: true },
        { id: 12, title: 'useEffect Hook', type: 'video', duration: '25:45', completed: false, locked: true },
        { id: 13, title: 'useContext Hook', type: 'video', duration: '18:20', completed: false, locked: true },
      ]
    },
    {
      id: 4,
      title: 'Advanced Concepts',
      description: 'Dive deeper into React',
      lessons: [
        { id: 14, title: 'React Router', type: 'video', duration: '28:10', completed: false, locked: true },
        { id: 15, title: 'State Management with Context API', type: 'video', duration: '32:25', completed: false, locked: true },
        { id: 16, title: 'Introduction to Redux', type: 'video', duration: '35:40', completed: false, locked: true },
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: '2023-06-10',
      comment: 'Great course! The instructor explains complex concepts in a way that\'s easy to understand.'
    },
    {
      id: 2,
      user: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 4,
      date: '2023-06-05',
      comment: 'Very comprehensive course with good examples. Would have liked more exercises though.'
    }
  ]
};

const CourseShow = ({ auth }) => {
  return (
    <DashboardLayout 
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {courseData.title}
            </h1>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center">
                    <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Dashboard
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Link href="/courses" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                      My Courses
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 text-sm font-medium text-gray-500">{courseData.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <BookOpenIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Continue Learning
            </button>
          </div>
        </div>
      }
    >
      <Head title={courseData.title} />
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Course Overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                {courseData.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <p>{courseData.duration} of content</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <BookOpenIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <p>{courseData.lessons} lessons</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <p>{courseData.students.toLocaleString()} students</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={courseData.thumbnail}
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Watch Introduction
                  </button>
                </div>
              </div>

              {/* Course Content */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Course Content</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  {courseData.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border-b border-gray-200 last:border-b-0">
                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {moduleIndex + 1}. {module.title}
                          </h4>
                          <p className="text-xs text-gray-500">{module.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                        </span>
                      </div>
                      <ul className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lesson.id} className="px-4 py-3 hover:bg-gray-50">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                                {lesson.completed ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : lesson.locked ? (
                                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <span className="text-gray-500">{lessonIndex + 1}</span>
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium ${
                                    lesson.completed ? 'text-green-600' : 'text-gray-900'
                                  }`}>
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    {lesson.type === 'video' && <VideoCameraIcon className="h-4 w-4 mr-1" />}
                                    {lesson.type === 'quiz' && <DocumentTextIcon className="h-4 w-4 mr-1" />}
                                    {lesson.duration}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {lesson.completed ? 'Completed' : lesson.locked ? 'Locked' : 'Available'}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Instructor</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={courseData.instructor.avatar}
                      alt={courseData.instructor.name}
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{courseData.instructor.name}</h4>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`h-5 w-5 ${
                              rating <= Math.round(courseData.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {courseData.rating} instructor rating
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{courseData.instructor.bio}</p>
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Student Reviews</h3>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Write a Review
                  </button>
                </div>
                
                <div className="mt-4">
                  {courseData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 py-6">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={review.avatar}
                          alt={review.user}
                        />
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={`h-4 w-4 ${
                                  rating <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                aria-hidden="true"
                              />
                            ))}
                            <span className="ml-2 text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Course Progress</h3>
                  <span className="text-sm font-medium text-indigo-600">{courseData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${courseData.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {courseData.progress}% complete
                </p>
                
                <div className="mt-6 space-y-4">
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {courseData.enrolled ? 'Continue Learning' : 'Enroll Now'}
                  </button>
                  
                  <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Share
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">This course includes:</h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center text-sm text-gray-600">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {courseData.duration} on-demand video
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {courseData.lessons} lessons
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Full lifetime access
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseShow;
