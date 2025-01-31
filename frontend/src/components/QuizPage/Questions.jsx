// import React, { useEffect, useState } from "react";
// import Question from "./Question";
// import Results from "./Results";

// function Questions() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);
//   const [data,setData]=useState([])

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch("/api/Uw5CrX");
//       const data = await response.json();
//       setData(data)
//       setQuestions(data.questions);
//     } catch (error) {
//       console.log("Error fetching questions from API", error);
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleAnswerSelect = (optionIndex) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [currentQuestionIndex]: optionIndex
//     }));
//   };

//   const handleSubmit = () => {
//      setShowResults(true);
    
//   };

//   const handleRestartQuiz = () => {
//     setShowResults(false);
//     setCurrentQuestionIndex(0);
//     setUserAnswers({});
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-lg">Loading questions...</p>
//       </div>
//     );
//   }

//   if (showResults) {
//     return (
//       <Results
//         questions={questions}
//         userAnswers={userAnswers}
//         onRestartQuiz={handleRestartQuiz}
//         correctMarks={data.correct_answer_marks}
//         negativeMarks={data.negative_marks}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="text-center mb-4 text-gray-600">
//           Question {currentQuestionIndex + 1} of {questions.length}
//         </div>

//         <Question
//           question={questions[currentQuestionIndex]}
//           index={currentQuestionIndex + 1}
//           selectedAnswer={userAnswers[currentQuestionIndex]}
//           onAnswerSelect={handleAnswerSelect}
//         />
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={handlePrevious}
//             disabled={currentQuestionIndex === 0}
//             className={`px-4 py-2 rounded-md ${
//               currentQuestionIndex === 0
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             }`}
//           >
//             Previous
//           </button>

//           {currentQuestionIndex === questions.length - 1 ? (
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
//             >
//               Submit Quiz
//             </button>
//           ) : (
//             <button
//               onClick={handleNext}
//               className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Questions;



import React, { useEffect, useState } from "react";
import Question from "./Question";
import Results from "./Results";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 15 minutes in seconds

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          clearInterval(timerId);
          handleSubmit(); // Submit when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(timerId);
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/Uw5CrX");
      const data = await response.json();
      setData(data);
      setQuestions(data.questions);
    } catch (error) {
      console.log("Error fetching questions from API", error);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    if (!showResults) { // ✅ Prevents multiple state updates
      setShowResults(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(1 * 60); // Reset the timer
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading questions...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <Results
        questions={questions}
        userAnswers={userAnswers}
        onRestartQuiz={handleRestartQuiz}
        correctMarks={data.correct_answer_marks}
        negativeMarks={data.negative_marks}
      />
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-4 text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="text-center mb-4 text-red-600">
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>

        <Question
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex + 1}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
        />
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-md ${
              currentQuestionIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;