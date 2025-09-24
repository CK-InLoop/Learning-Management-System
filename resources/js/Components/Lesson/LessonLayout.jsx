import { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import VideoPlayer from './VideoPlayer';

const LessonLayout = ({
  course,
  currentLesson,
  onCompleteLesson,
  onNextLesson,
  onPreviousLesson,
  hasNextLesson,
  hasPreviousLesson,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState('lesson');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Mock lesson data - replace with actual data from your API
  const lesson = {
    id: currentLesson.id,
    title: currentLesson.title,
    description: 'In this lesson, you\'ll learn the core concepts of React components and how to build reusable UI elements.',
    videoUrl: 'https://example.com/sample-video.mp4',
    duration: '15:30',
    content: `
      <h2 class="text-xl font-bold mb-4">${currentLesson.title}</h2>
      <p class="mb-4">Welcome to this lesson on ${currentLesson.title}. In this tutorial, we'll cover the fundamental concepts and provide you with practical examples to help you understand the topic better.</p>
      
      <h3 class="text-lg font-semibold mt-6 mb-3">Key Concepts</h3>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li>Understanding the core principles</li>
        <li>Practical applications</li>
        <li>Common pitfalls to avoid</li>
        <li>Best practices</li>
      </ul>
      
      <h3 class="text-lg font-semibold mt-6 mb-3">Example Code</h3>
      <pre class="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
        <code>{
`// Example code snippet
function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
        }</code>
      </pre>
      
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p class="font-medium text-blue-700">Pro Tip</p>
        <p class="text-blue-600">Take your time to practice the examples and experiment with the code to reinforce your understanding.</p>
      </div>
    `
  };

  const handleCompleteLesson = async () => {
    try {
      setIsCompleting(true);
      await onCompleteLesson(lesson.id);
    } finally {
      setIsCompleting(false);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <ArrowPathIcon className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading lesson...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white shadow-sm">
          {/* Video Player */}
          <div className="bg-black">
            <VideoPlayer
              url={lesson.videoUrl}
              title={lesson.title}
              duration={lesson.duration}
              completed={currentLesson.completed}
              locked={currentLesson.locked}
              onComplete={handleCompleteLesson}
              onNext={onNextLesson}
              onPrevious={onPreviousLesson}
              hasNext={hasNextLesson}
              hasPrevious={hasPreviousLesson}
            />
          </div>

          {/* Lesson Header */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Course: {course.title} • {lesson.duration}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full ${
                    isBookmarked 
                      ? 'text-yellow-500 hover:bg-yellow-50' 
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
                >
                  <BookmarkIcon 
                    className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} 
                  />
                </button>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100"
                  aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
                >
                  <BookOpenIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lesson'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lesson
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resources
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'discussion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Discussion
              </button>
              <button
                onClick={() => setActiveTab('qna')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'qna'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Q&A
              </button>
            </nav>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white p-6">
          {activeTab === 'lesson' && (
            <div>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button
                    onClick={onPreviousLesson}
                    disabled={!hasPreviousLesson}
                    className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                      hasPreviousLesson
                        ? 'text-gray-700 bg-white hover:bg-gray-50'
                        : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Previous Lesson
                  </button>
                  
                  {!currentLesson.completed && !currentLesson.locked && (
                    <button
                      onClick={handleCompleteLesson}
                      disabled={isCompleting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isCompleting ? (
                        <>
                          <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Marking as Complete...
                        </>
                      ) : (
                        'Mark as Complete'
                      )}
                    </button>
                  )}
                  
                  <button
                    onClick={onNextLesson}
                    disabled={!hasNextLesson}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                      hasNextLesson
                        ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                        : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    }`}
                  >
                    {hasNextLesson ? 'Next Lesson' : 'Complete Course'}
                    <ChevronRightIcon className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No resources available</h3>
              <p className="mt-1 text-sm text-gray-500">This lesson doesn't have any additional resources yet.</p>
            </div>
          )}
          
          {activeTab === 'discussion' && (
            <div className="text-center py-12">
              <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No discussion yet</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to start a discussion about this lesson.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start a Discussion
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'qna' && (
            <div className="text-center py-12">
              <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No questions yet</h3>
              <p className="mt-1 text-sm text-gray-500">Have a question about this lesson? Ask it here.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Ask a Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Lesson List */}
      <div 
        className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto`}
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Course Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            {course.modules.reduce((total, module) => total + module.lessons.length, 0)} lessons • {course.duration}
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="py-2">
              <div className="px-4 py-2 flex items-center justify-between bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">
                  {moduleIndex + 1}. {module.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                </span>
              </div>
              <ul className="mt-1">
                {module.lessons.map((lesson, lessonIndex) => {
                  const isActive = lesson.id === currentLesson.id;
                  const isCompleted = lesson.completed;
                  const isLocked = lesson.locked && !isCompleted;
                  
                  return (
                    <li key={lesson.id} className="relative">
                      <button
                        onClick={() => !isLocked && onLessonSelect(lesson.id)}
                        disabled={isLocked}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center ${
                          isActive 
                            ? 'bg-indigo-50 text-indigo-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        } ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center">
                          {isCompleted ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          ) : isLocked ? (
                            <LockClosedIcon className="h-3.5 w-3.5 text-gray-400" />
                          ) : (
                            <span className="text-xs text-gray-500">{lessonIndex + 1}</span>
                          )}
                        </div>
                        <span className="ml-3 truncate">
                          {lesson.title}
                        </span>
                        <span className="ml-auto text-xs text-gray-500">
                          {lesson.duration}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonLayout;
