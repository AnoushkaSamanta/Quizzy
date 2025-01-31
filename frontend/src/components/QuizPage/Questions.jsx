import React, { useEffect, useState } from "react";
import Question from "./Question";
import Results from "./Results";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60); 

  //questions fetched once page is loaded
  useEffect(() => {
    fetchQuestions();
  }, []);


  //timer of 15 minutes
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
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

      //questions fetched from api
      const response = await fetch("/api/Uw5CrX");
      const data = await response.json();
      setData(data);
      setQuestions(data.questions);
    } catch (error) {
      console.log("Error fetching questions from API", error);
    }
  };

  //navigation buttons functionality
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };


  //user answers set and updated
  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  //on submission result is shown
  const handleSubmit = () => {
    if (!showResults) {
      setShowResults(true);
    }
  };


  //to restart quiz
  const handleRestartQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(15 * 60); // Reset the timer
  };


  //if no questions fetched yet
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading questions...</p>
      </div>
    );
  }


  //results shown here if showResults is true
  if (showResults) {
    return (
      <Results
        quizData={data}
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
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;


  //questions displayed
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center text-gray-600 font-semibold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {/* Timer Section */}
        <div className="flex justify-center items-center mb-4">
          <div className="px-4 py-2 text-white text-sm font-bold rounded-lg bg-red-600 shadow-md">
            ⏳ Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <Question
          question={questions[currentQuestionIndex]}
          index={currentQuestionIndex + 1}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              currentQuestionIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}
          >
            ← Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white shadow-md transition-all duration-300"
            >
              Submit Quiz →
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-300"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
