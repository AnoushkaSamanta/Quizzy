import React from "react";

function Question({ index, question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Question {index}</h2>
      <p className="text-lg mb-6 text-gray-800">{question.description}</p>

      <div className="space-y-3">
        {question.options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedAnswer === optionIndex
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-100"
            }`}
            onClick={() => onAnswerSelect(optionIndex)}
          >
            <input
              type="radio"
              id={`option${optionIndex}`}
              name={`question${index}`}
              className="hidden"
              checked={selectedAnswer === optionIndex}
              onChange={() => onAnswerSelect(optionIndex)}
            />
            <div
              className={`h-5 w-5 border-2 rounded-full flex items-center justify-center mr-4 transition-all ${
                selectedAnswer === optionIndex
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-400 bg-white"
              }`}
            >
              {selectedAnswer === optionIndex && (
                <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
              )}
            </div>
            <label
              htmlFor={`option${optionIndex}`}
              className="text-lg text-gray-700 cursor-pointer flex-1"
            >
              {option.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
