import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Multiple Choice Question Component
export const MultipleChoiceQuestion = ({
  question,
  selectedOptions = [],
  onOptionSelect,
  showResults = false,
  isCorrect = null,
  correctAnswers = []
}) => {
  const handleOptionClick = (optionId) => {
    if (question.type === 'multiple') {
      // Toggle selection for multiple correct answers
      const newSelected = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId];
      onOptionSelect(newSelected);
    } else {
      // Single selection for single correct answer
      onOptionSelect([optionId]);
    }
  };

  const getOptionState = (optionId) => {
    if (!showResults) return '';
    
    const isSelected = selectedOptions.includes(optionId);
    const isCorrectAnswer = correctAnswers.includes(optionId);
    
    if (isSelected && isCorrectAnswer) return 'bg-green-50 border-green-500 text-green-700';
    if (isSelected && !isCorrectAnswer) return 'bg-red-50 border-red-500 text-red-700';
    if (!isSelected && isCorrectAnswer) return 'bg-green-50 border-green-300 text-green-700';
    return 'bg-white border-gray-300';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
      {question.description && (
        <p className="text-sm text-gray-500 mb-4">{question.description}</p>
      )}
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${getOptionState(option.id)} ${
              !showResults ? 'hover:bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                selectedOptions.includes(option.id) 
                  ? 'bg-indigo-600 border-indigo-600' 
                  : 'border-gray-300'
              }`}>
                {selectedOptions.includes(option.id) && (
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm">{option.text}</span>
              
              {showResults && (
                <div className="ml-auto">
                  {correctAnswers.includes(option.id) ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : selectedOptions.includes(option.id) ? (
                    <XMarkIcon className="h-5 w-5 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
            
            {showResults && option.explanation && (
              <div className="mt-2 pl-8 text-sm text-gray-600">
                {option.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showResults && question.feedback && (
        <div className={`mt-4 p-4 rounded-md ${
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="text-sm">{isCorrect ? 'Correct!' : 'Incorrect.'} {question.feedback}</p>
        </div>
      )}
    </div>
  );
};

// True/False Question Component
export const TrueFalseQuestion = ({
  question,
  selectedAnswer = null,
  onAnswerSelect,
  showResults = false,
  isCorrect = null,
  correctAnswer
}) => {
  const handleSelect = (answer) => {
    onAnswerSelect([answer]);
  };

  const getButtonClass = (answer) => {
    if (!showResults) 
      return 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
    
    if (answer === correctAnswer) 
      return 'bg-green-50 border-green-500 text-green-700';
    
    if (answer === selectedAnswer) 
      return 'bg-red-50 border-red-500 text-red-700';
    
    return 'bg-white border-gray-300 text-gray-400';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
      {question.description && (
        <p className="text-sm text-gray-500 mb-4">{question.description}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => handleSelect(true)}
          disabled={showResults}
          className={`p-4 border rounded-lg text-center ${getButtonClass(true)}`}
        >
          <div className="flex items-center justify-center">
            <span>True</span>
            {showResults && correctAnswer === true && (
              <CheckIcon className="h-5 w-5 text-green-500 ml-2" />
            )}
            {showResults && selectedAnswer === true && !isCorrect && (
              <XMarkIcon className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>
        </button>
        
        <button
          onClick={() => handleSelect(false)}
          disabled={showResults}
          className={`p-4 border rounded-lg text-center ${getButtonClass(false)}`}
        >
          <div className="flex items-center justify-center">
            <span>False</span>
            {showResults && correctAnswer === false && (
              <CheckIcon className="h-5 w-5 text-green-500 ml-2" />
            )}
            {showResults && selectedAnswer === false && !isCorrect && (
              <XMarkIcon className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>
        </button>
      </div>
      
      {showResults && question.feedback && (
        <div className={`mt-4 p-4 rounded-md ${
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="text-sm">{isCorrect ? 'Correct!' : 'Incorrect.'} {question.feedback}</p>
        </div>
      )}
    </div>
  );
};

// Fill in the Blank Question Component
export const FillInTheBlankQuestion = ({
  question,
  userAnswer = '',
  onAnswerChange,
  showResults = false,
  isCorrect = null,
  correctAnswers = []
}) => {
  const handleChange = (e) => {
    onAnswerChange([e.target.value]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {question.text.split('___').map((part, index) => (
          <span key={index}>
            {part}
            {index < question.text.split('___').length - 1 && (
              <span className="relative inline-block mx-1">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleChange}
                  disabled={showResults}
                  className={`w-32 px-2 py-1 border-b-2 focus:outline-none focus:ring-0 ${
                    showResults
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                />
                {showResults && !isCorrect && (
                  <span className="absolute left-0 -bottom-6 text-xs text-green-600 whitespace-nowrap">
                    Correct answer: {correctAnswers[0]}
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </h3>
      
      {question.description && (
        <p className="text-sm text-gray-500">{question.description}</p>
      )}
      
      {showResults && question.feedback && (
        <div className={`mt-4 p-4 rounded-md ${
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="text-sm">{isCorrect ? 'Correct!' : 'Incorrect.'} {question.feedback}</p>
        </div>
      )}
    </div>
  );
};

// Matching Question Component
export const MatchingQuestion = ({
  question,
  userMatches = {},
  onMatchUpdate,
  showResults = false,
  isCorrect = null,
  correctMatches = {}
}) => {
  const leftItems = question.leftItems || [];
  const rightItems = question.rightItems || [];
  
  const handleSelect = (leftId, rightId) => {
    if (showResults) return;
    
    const newMatches = { ...userMatches };
    
    // Remove any existing match for this right item
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });
    
    // Add the new match
    newMatches[leftId] = rightId;
    onMatchUpdate(newMatches);
  };
  
  const getMatchClass = (leftId, rightId) => {
    if (!showResults) return 'border-gray-300';
    
    const isCorrectMatch = correctMatches[leftId] === rightId;
    const isUserMatch = userMatches[leftId] === rightId;
    
    if (isCorrectMatch && isUserMatch) return 'border-green-500 bg-green-50';
    if (isUserMatch) return 'border-red-500 bg-red-50';
    if (isCorrectMatch) return 'border-green-300 bg-green-50';
    
    return 'border-gray-300';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
      {question.description && (
        <p className="text-sm text-gray-500 mb-4">{question.description}</p>
      )}
      
      <div className="space-y-4">
        {leftItems.map((leftItem) => (
          <div key={leftItem.id} className="flex items-center">
            <div className="w-1/3 pr-4">
              <div className="bg-gray-50 p-2 rounded-md">
                {leftItem.text}
              </div>
            </div>
            <div className="flex-1">
              <select
                value={userMatches[leftItem.id] || ''}
                onChange={(e) => handleSelect(leftItem.id, e.target.value)}
                disabled={showResults}
                className={`w-full p-2 border rounded-md ${getMatchClass(leftItem.id, userMatches[leftItem.id])}`}
              >
                <option value="">Select a match</option>
                {rightItems.map((rightItem) => (
                  <option 
                    key={rightItem.id} 
                    value={rightItem.id}
                    disabled={Object.values(userMatches).includes(rightItem.id) && userMatches[leftItem.id] !== rightItem.id}
                  >
                    {rightItem.text}
                  </option>
                ))}
              </select>
              
              {showResults && correctMatches[leftItem.id] === userMatches[leftItem.id] && (
                <div className="mt-1 text-xs text-green-600">
                  <CheckIcon className="h-3 w-3 inline mr-1" />
                  Correct match!
                </div>
              )}
              {showResults && correctMatches[leftItem.id] !== userMatches[leftItem.id] && userMatches[leftItem.id] && (
                <div className="mt-1 text-xs text-red-600">
                  <XMarkIcon className="h-3 w-3 inline mr-1" />
                  Should be: {rightItems.find(r => r.id === correctMatches[leftItem.id])?.text}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showResults && question.feedback && (
        <div className={`mt-4 p-4 rounded-md ${
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="text-sm">{isCorrect ? 'Great job!' : 'Keep practicing!'} {question.feedback}</p>
        </div>
      )}
    </div>
  );
};
