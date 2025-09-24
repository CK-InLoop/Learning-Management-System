import { Head, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
  ArrowLeftIcon,
  HomeIcon,
  BookOpenIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/Layouts/DashboardLayout';
import LessonLayout from '@/Components/Lesson/LessonLayout';

// Mock data - replace with actual API calls
const mockCourseData = {
  id: 1,
  title: 'Introduction to React',
  description: 'Learn the fundamentals of React including components, state, and props.',
  duration: '12 hours',
  modules: [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Introduction to React and its core concepts',
      lessons: [
        { id: 1, title: 'What is React?', duration: '12:45', completed: true, locked: false },
        { id: 2, title: 'Setting up your environment', duration: '08:30', completed: true, locked: false },
        { id: 3, title: 'Understanding JSX', duration: '15:20', completed: true, locked: false },
        { id: 4, title: 'Your first component', duration: '18:10', completed: false, locked: false },
      ]
    },
    {
      id: 2,
      title: 'Components and Props',
      description: 'Learn how to create and use components',
      lessons: [
        { id: 5, title: 'Functional vs Class Components', duration: '14:25', completed: false, locked: false },
        { id: 6, title: 'Understanding Props', duration: '16:40', completed: false, locked: true },
        { id: 7, title: 'Component Composition', duration: '12:15', completed: false, locked: true },
      ]
    },
    {
      id: 3,
      title: 'State and Lifecycle',
      description: 'Managing state and component lifecycle',
      lessons: [
        { id: 8, title: 'Introduction to State', duration: '20:15', completed: false, locked: true },
        { id: 9, title: 'setState and useState', duration: '22:30', completed: false, locked: true },
        { id: 10, title: 'useEffect Hook', duration: '25:45', completed: false, locked: true },
      ]
    }
  ]
};

const LessonPlayerPage = ({ course: initialCourse, lesson: initialLesson, auth }) => {
  const [course, setCourse] = useState(initialCourse || mockCourseData);
  const [currentLesson, setCurrentLesson] = useState(initialLesson || mockCourseData.modules[0].lessons[0]);
  const [loading, setLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Flatten all lessons for easier navigation
  const allLessons = course.modules.flatMap(module => 
    module.lessons.map(lesson => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title
    }))
  );

  // Find current lesson index
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
  const hasNextLesson = currentIndex < allLessons.length - 1;
  const hasPreviousLesson = currentIndex > 0;

  // Find current module
  const currentModule = course.modules.find(m => 
    m.lessons.some(l => l.id === currentLesson.id)
  );

  // Handle lesson completion
  const handleCompleteLesson = async (lessonId) => {
    try {
      setIsCompleting(true);
      
      // In a real app, you would make an API call here
      // await axios.post(`/api/lessons/${lessonId}/complete`);
      
      // Update local state
      const updatedModules = course.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === lessonId 
            ? { ...lesson, completed: true }
            : lesson
        )
      }));
      
      setCourse(prev => ({
        ...prev,
        modules: updatedModules
      }));
      
      // Unlock next lesson if available
      if (hasNextLesson) {
        const nextLesson = allLessons[currentIndex + 1];
        if (nextLesson.locked) {
          const updatedModulesWithUnlock = updatedModules.map(module => ({
            ...module,
            lessons: module.lessons.map(lesson => 
              lesson.id === nextLesson.id 
                ? { ...lesson, locked: false }
                : lesson
            )
          }));
          
          setCourse(prev => ({
            ...prev,
            modules: updatedModulesWithUnlock
          }));
        }
      }
      
      // Show success message
      // toast.success('Lesson marked as completed!');
      
    } catch (error) {
      console.error('Error completing lesson:', error);
      // toast.error('Failed to mark lesson as completed');
    } finally {
      setIsCompleting(false);
    }
  };

  // Handle navigation to next/previous lesson
  const handleNextLesson = () => {
    if (hasNextLesson) {
      const nextLesson = allLessons[currentIndex + 1];
      navigateToLesson(nextLesson.id);
    }
  };

  const handlePreviousLesson = () => {
    if (hasPreviousLesson) {
      const prevLesson = allLessons[currentIndex - 1];
      navigateToLesson(prevLesson.id);
    }
  };

  // Navigate to a specific lesson
  const navigateToLesson = (lessonId) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (lesson && !lesson.locked) {
      setCurrentLesson(lesson);
      
      // In a real app, you would update the URL and fetch the lesson data
      // router.visit(`/courses/${course.id}/lessons/${lessonId}`);
      
      // Scroll to top of the page
      window.scrollTo(0, 0);
    }
  };

  // Handle lesson selection from sidebar
  const handleLessonSelect = (lessonId) => {
    navigateToLesson(lessonId);
  };

  // Get completion percentage
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(lesson => lesson.completed).length;
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <DashboardLayout 
      user={auth.user}
      header={
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="mr-4 p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label="Back to course"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {currentModule?.title || 'Loading...'}
            </h1>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{course.title}</span>
            <span className="mx-2">•</span>
            <span>Lesson {currentIndex + 1} of {allLessons.length}</span>
            <span className="mx-2">•</span>
            <div className="w-24 bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="ml-2 text-xs text-gray-500">{completionPercentage}%</span>
          </div>
        </div>
      }
    >
      <Head title={`${currentLesson?.title || 'Lesson'} | ${course.title}`} />
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <ArrowPathIcon className="animate-spin h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-gray-600">Loading lesson...</span>
          </div>
        ) : (
          <LessonLayout
            course={course}
            currentLesson={currentLesson}
            onCompleteLesson={handleCompleteLesson}
            onNextLesson={handleNextLesson}
            onPreviousLesson={handlePreviousLesson}
            hasNextLesson={hasNextLesson}
            hasPreviousLesson={hasPreviousLesson}
            onLessonSelect={handleLessonSelect}
          />
        )}
      </div>
      
      {/* Navigation Buttons (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-between z-10">
        <button
          onClick={handlePreviousLesson}
          disabled={!hasPreviousLesson}
          className={`px-4 py-2 rounded-md flex items-center ${
            hasPreviousLesson
              ? 'text-indigo-600 hover:bg-indigo-50'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="ml-1">Previous</span>
        </button>
        
        {!currentLesson.completed && !currentLesson.locked && (
          <button
            onClick={() => handleCompleteLesson(currentLesson.id)}
            disabled={isCompleting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          >
            {isCompleting ? (
              <>
                <ArrowPathIcon className="animate-spin h-4 w-4 mr-2" />
                Completing...
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
        )}
        
        <button
          onClick={handleNextLesson}
          disabled={!hasNextLesson}
          className={`px-4 py-2 rounded-md flex items-center ${
            hasNextLesson
              ? 'text-indigo-600 hover:bg-indigo-50'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <span className="mr-1">Next</span>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </DashboardLayout>
  );
};

export default LessonPlayerPage;
