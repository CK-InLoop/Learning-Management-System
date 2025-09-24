import { Link } from '@inertiajs/react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  ArrowTopRightOnSquareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const QuizAttempts = ({ attempts, quizId, quizTitle }) => {
  if (!attempts || attempts.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quiz Attempts
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            No attempts have been made for this quiz yet.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')} min`;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quiz Attempts: {quizTitle}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your previous attempts at this quiz
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href={route('quizzes.take', quizId)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
              Retake Quiz
            </Link>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attempt
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Spent
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attempts.map((attempt, index) => (
              <tr key={attempt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Attempt {attempts.length - index}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(attempt.completed_at || attempt.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      attempt.score >= 70 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.round(attempt.score)}%
                    </span>
                    <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          attempt.score >= 70 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${attempt.score}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {attempt.status === 'completed' ? (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      attempt.passed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {attempt.passed ? 'Passed' : 'Failed'}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                    {formatDuration(attempt.time_spent)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={route('quizzes.results', { quiz: quizId, attempt: attempt.id })}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    <span>View Details</span>
                    <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
        <p className="text-xs text-gray-500">
          Showing {attempts.length} of {attempts.length} attempts
        </p>
      </div>
    </div>
  );
};

export default QuizAttempts;
