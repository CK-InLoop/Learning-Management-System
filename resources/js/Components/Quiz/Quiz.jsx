import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowPathIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon,
  ClockIcon,
  TrophyIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { 
  MultipleChoiceQuestion, 
  TrueFalseQuestion, 
  FillInTheBlankQuestion, 
  MatchingQuestion 
} from './QuestionTypes';

export default function Quiz({ 
  quiz, 
  initialAnswers = {}, 
  onComplete,
  showResults = false,
  attemptId = null,
  timeLimit = null // in seconds
}) {
  const { auth } = usePage().props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [results, setResults] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnswered = answers[currentQuestion.id] !== undefined;
  const totalQuestions = quiz.questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);
  
  // Timer effect
  useEffect(() => {
    if (!timeLimit || showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLimit, showResults]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    if (seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!showConfirmation && !isTimeUp) {
      setShowConfirmation(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(route('quizzes.submit', {
        quiz: quiz.id,
        attempt: attemptId
      }), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          answers,
          time_spent: timeLimit ? timeLimit - timeLeft : null
        })
      });
      
      if (!response.ok) throw new Error('Failed to submit quiz');
      
      const result = await response.json();
      setResults(result);
      
      if (onComplete) {
        onComplete(result);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };
  
  const renderQuestion = () => {
    const question = currentQuestion;
    const userAnswer = answers[question.id];
    const isCorrect = results?.questions?.[question.id]?.is_correct;
    const correctAnswers = results?.questions?.[question.id]?.correct_answers || [];
    
    switch (question.type) {
      case 'multiple_choice':
      case 'multiple_correct':
        return (
          <MultipleChoiceQuestion
            question={question}
            selectedOptions={userAnswer || []}
            onOptionSelect={(answer) => handleAnswer(question.id, answer)}
            showResults={!!results}
            isCorrect={isCorrect}
            correctAnswers={correctAnswers}
          />
        );
        
      case 'true_false':
        return (
          <TrueFalseQuestion
            question={question}
            selectedAnswer={userAnswer?.[0]}
            onAnswerSelect={(answer) => handleAnswer(question.id, answer)}
            showResults={!!results}
            isCorrect={isCorrect}
            correctAnswer={correctAnswers[0]}
          />
        );
        
      case 'fill_in_blank':
        return (
          <FillInTheBlankQuestion
            question={question}
            userAnswer={userAnswer?.[0] || ''}
            onAnswerChange={(answer) => handleAnswer(question.id, answer)}
            showResults={!!results}
            isCorrect={isCorrect}
            correctAnswers={correctAnswers}
          />
        );
        
      case 'matching':
        return (
          <MatchingQuestion
            question={question}
            userMatches={userAnswer || {}}
            onMatchUpdate={(matches) => handleAnswer(question.id, matches)}
            showResults={!!results}
            isCorrect={isCorrect}
            correctMatches={correctAnswers.reduce((acc, curr) => ({
              ...acc,
              [curr.left_id]: curr.right_id
            }), {})}
          />
        );
        
      default:
        return <div>Unsupported question type</div>;
    }
  };
  
  // Show results if quiz is completed
  if (results) {
    const score = results.score || 0;
    const passed = score >= (quiz.passing_score || 70);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
            {passed ? (
              <CheckBadgeIcon className="h-12 w-12 text-green-600" />
            ) : (
              <TrophyIcon className="h-12 w-12 text-yellow-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Quiz Completed!' : 'Quiz Submitted'}
          </h2>
          <p className="text-gray-600 mb-6">
            {passed 
              ? 'Congratulations! You have passed the quiz.' 
              : `You scored ${score}% but needed ${quiz.passing_score || 70}% to pass.`}
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className={`h-4 rounded-full ${
                passed ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Score</p>
              <p className="text-2xl font-bold">{score}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Correct</p>
              <p className="text-2xl font-bold text-green-600">
                {results.correct_count || 0} / {quiz.questions.length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Time Spent</p>
              <p className="text-2xl font-bold">
                {formatTime(results.time_spent || 0)}
              </p>
            </div>
          </div>
          
          {results.feedback && (
            <div className={`p-4 rounded-md mb-6 ${
              passed ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
            }`}>
              <p className="text-sm">{results.feedback}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
              Retake Quiz
            </button>
            
            <a
              href={route('courses.show', quiz.course_id)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Course
            </a>
          </div>
        </div>
        
        {quiz.review_enabled && (
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Question Review</h3>
            <div className="space-y-8">
              {quiz.questions.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = results.questions?.[q.id]?.is_correct;
                const correctAnswers = results.questions?.[q.id]?.correct_answers || [];
                
                return (
                  <div key={q.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? (
                          <CheckCircleIcon className="h-4 w-4" />
                        ) : (
                          <XCircleIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Question {index + 1}: {q.text}
                        </h4>
                        
                        {q.type === 'multiple_choice' || q.type === 'multiple_correct' ? (
                          <div className="mt-2 space-y-2">
                            {q.options.map(option => {
                              const isSelected = userAnswer?.includes(option.id);
                              const isCorrectAnswer = correctAnswers.includes(option.id);
                              
                              return (
                                <div 
                                  key={option.id} 
                                  className={`p-2 text-sm rounded ${
                                    isSelected && isCorrectAnswer ? 'bg-green-50 text-green-800 border border-green-200' :
                                    isSelected ? 'bg-red-50 text-red-800 border border-red-200' :
                                    isCorrectAnswer ? 'bg-green-50 text-green-800 border border-green-200' :
                                    'bg-gray-50 text-gray-700 border border-gray-200'
                                  }`}
                                >
                                  {option.text}
                                  {isCorrectAnswer && (
                                    <span className="ml-2 text-xs text-green-600">
                                      (Correct Answer)
                                    </span>
                                  )}
                                  {isSelected && !isCorrectAnswer && (
                                    <span className="ml-2 text-xs text-red-600">
                                      (Your Answer)
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : q.type === 'true_false' ? (
                          <div className="mt-2">
                            <p className="text-sm">
                              Your answer: <span className="font-medium">{userAnswer?.[0] ? 'True' : 'False'}</span>
                            </p>
                            <p className="text-sm">
                              Correct answer: <span className="font-medium">{correctAnswers[0] ? 'True' : 'False'}</span>
                            </p>
                          </div>
                        ) : q.type === 'fill_in_blank' ? (
                          <div className="mt-2">
                            <p className="text-sm">
                              Your answer: <span className="font-medium">{userAnswer?.[0] || 'No answer provided'}</span>
                            </p>
                            <p className="text-sm">
                              Correct answer: <span className="font-medium">{correctAnswers[0]}</span>
                            </p>
                          </div>
                        ) : q.type === 'matching' ? (
                          <div className="mt-2 space-y-2">
                            {q.leftItems.map(leftItem => (
                              <div key={leftItem.id} className="flex items-center text-sm">
                                <span className="w-1/3">{leftItem.text}</span>
                                <span className="mx-2">→</span>
                                <span className="flex-1">
                                  {q.rightItems.find(r => r.id === userAnswer?.[leftItem.id])?.text || 'No match'}
                                  {correctAnswers.find(ca => ca.left_id === leftItem.id)?.right_id !== userAnswer?.[leftItem.id] && (
                                    <span className="ml-2 text-xs text-red-600">
                                      (Should be: {q.rightItems.find(r => r.id === correctAnswers.find(ca => ca.left_id === leftItem.id)?.right_id)?.text})
                                    </span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        
                        {q.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-md">
                            <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                            <p className="text-sm text-blue-700">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Show quiz in progress
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Quiz Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{quiz.title}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>
          
          {timeLimit > 0 && (
            <div className="mt-2 sm:mt-0 flex items-center text-sm font-medium text-gray-700">
              <ClockIcon className="h-5 w-5 text-gray-500 mr-1.5" />
              Time Remaining: {formatTime(timeLeft)}
            </div>
          )}
        </div>
        
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question Navigation */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-1">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentQuestionIndex === index
                  ? 'bg-indigo-600 text-white'
                  : answers[quiz.questions[index].id] !== undefined
                  ? 'bg-green-100 text-green-800'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Quiz Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {renderQuestion()}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={isFirstQuestion || isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                isFirstQuestion 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </button>
            
            {!isLastQuestion ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasAnswered || isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  !hasAnswered || isSubmitting
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Next Question
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isSubmitting ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Submitting...
                  </>
                ) : (
                  'Submit Quiz'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Submit Quiz?</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    You have {quiz.questions.length - Object.keys(answers).length} unanswered questions. 
                    Are you sure you want to submit?
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isSubmitting ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Submitting...
                  </>
                ) : (
                  'Yes, Submit Quiz'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Time's Up Modal */}
      {isTimeUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <ClockIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Time's Up!</h3>
            <p className="text-gray-600 mb-6">
              Your quiz is being submitted automatically. You've answered {Object.keys(answers).length} out of {quiz.questions.length} questions.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Submitting...' : 'View Results'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
