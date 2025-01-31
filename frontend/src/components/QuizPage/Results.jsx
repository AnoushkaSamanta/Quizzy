import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Results({ quizData, questions, userAnswers, onRestartQuiz }) {
  const [quizAnswers, setQuizAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [correctAnswers, setCorrectAnswers] = useState(
    new Array(questions.length).fill(null)
  );


  //giving messages based on quiz performance
  const triggerToaster = (score) => {
    let message = "";
    if (score >= 35) {
      message = "Excellent!";
    } else if (score >= 25) {
      message = "Good!";
    } else if (score >= 15) {
      message = "Can do better!";
    } else {
      message = "Needs Improvement!";
    }

    toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    unattempted: 0,
  });
  const [showDetailedReview, setShowDetailedReview] = useState(false);

  useEffect(() => {

    //calculating score and number of correct,incorrect and unattempted questions here
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let newCorrectAnswers = new Array(questions.length).fill(null);
    let newQuizAnswers = new Array(questions.length).fill(null);

    questions.forEach((question, index) => {
      let correctAnsIndex = question.options.findIndex(
        (option) => option.is_correct
      );

      if (userAnswers[index] === undefined) {
        unattempted++;
      } else if (userAnswers[index] === correctAnsIndex) {
        correct++;
        newCorrectAnswers[index] = userAnswers[index];
      } else {
        incorrect++;
      }

      // Set quiz answers with the correct answer index
      newQuizAnswers[index] = correctAnsIndex;
    });

    setQuizAnswers(newQuizAnswers);
    setStats({ correct, incorrect, unattempted });
    setCorrectAnswers(newCorrectAnswers);

    //final score calculated
    const finalScore =
      correct * quizData.correct_answer_marks -
      incorrect * quizData.negative_marks;
    triggerToaster(finalScore);
  }, [questions, userAnswers]);


  //user answer status -correct,incorrect ,unattempted
  const getQuestionStatus = (index) => {
    if (userAnswers[index] === undefined) return "unattempted";
    return correctAnswers[index] !== null ? "correct" : "incorrect";
  };

  const renderDetailedReview = () => {
    return (
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">
          Quiz Detailed Review
        </h3>

        {questions.map((question, index) => {
          const status = getQuestionStatus(index);
          const correctAns = question.options.findIndex(
            //finding correct answer
            (option) => option.is_correct
          );

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                status === "correct"
                  ? "bg-green-50 border-green-200"
                  : status === "incorrect"
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="font-medium mb-2 text-gray-800">
                <span className="mr-2">{index + 1}.</span>
                {question.description}
              </div>
              <div className="space-y-2 mb-4">
                {question.options.map((option, optIndex) => {
                  let optionClass = "p-2 rounded";
                  if (status === "incorrect" && optIndex === correctAns) {
                    optionClass += " bg-green-200";
                  } else if (
                    status === "incorrect" &&
                    optIndex === userAnswers[index]
                  ) {
                    optionClass += " bg-red-200";
                  } else if (optIndex === userAnswers[index]) {
                    optionClass += " bg-blue-100";
                  }

                  return (
                    <div key={optIndex} className={optionClass}>
                      {option.text}
                      {optIndex === correctAns && (
                        <span className="ml-2 text-green-600 font-semibold">
                          {/* Correct Option Displayed */}
                          (Correct Answer)
                          {" " + (quizAnswers[index] + 1)}
                        </span>
                      )}
                      {status === "incorrect" &&
                        optIndex === userAnswers[index] && (
                          <span className="ml-2 text-red-600 font-semibold">
                            {/* User Option Displayed */}
                            (Your Answer)
                            {" " + userAnswers[index]}
                          </span>
                        )}
                    </div>
                  );
                })}
              </div>
              {/* Detailed Solution Section */}
              {question.detailed_solution && (
                <div className="bg-gray-100 p-3 rounded-lg text-sm">
                  <strong className="block mb-2 text-gray-700">
                    Detailed Solution:
                  </strong>
                  <div className="whitespace-pre-wrap text-gray-600">
                    {question.detailed_solution && (
                      <div className="bg-gray-100 p-3 rounded-lg text-sm">
                        <strong className="block mb-2">
                          Detailed Solution:
                        </strong>
                        <div
                          className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: question.detailed_solution.replace(
                              /\*\*(.*?)\*\*/g,
                              "<b>$1</b>"
                            ),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A192F] py-12 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#1D2A38] rounded-lg shadow-md p-6">
          {/* Quiz Title and Details */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-cyan-400">
              {quizData.title || "Quiz Results"}
            </h1>
            <p className="text-gray-300 mt-2">
              Topic: {quizData.topic || "General"}
            </p>
          </div>

          {/* Results Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
              Quiz Results
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-600 text-xl font-semibold">
                  {stats.correct}
                </p>
                <p className="text-green-600">Correct</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-600 text-xl font-semibold">
                  {stats.incorrect}
                </p>
                <p className="text-red-600">Incorrect</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-xl font-semibold">
                  {stats.unattempted}
                </p>
                <p className="text-gray-600">Unattempted</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg">
                <strong>Final Score:</strong>{" "}
                {/* Calculating total score */}
                {stats.correct * quizData.correct_answer_marks -
                  stats.incorrect * quizData.negative_marks}{" "}
                /{questions.length * quizData.correct_answer_marks}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Correct: +{quizData.correct_answer_marks} | Incorrect: -
                {quizData.negative_marks}
              </p>
            </div>
          </div>

          <div className="text-center mb-4">
            <button
              onClick={() => setShowDetailedReview(!showDetailedReview)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {showDetailedReview
                ? "Hide Detailed Review"
                : "Show Detailed Review"}
            </button>
          </div>

          {showDetailedReview && renderDetailedReview()}

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={onRestartQuiz}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Restart Quiz
            </button>
            <NavLink
              to="/home"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Go Back Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
