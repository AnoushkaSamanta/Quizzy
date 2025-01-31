import React from "react";

function Question({ index, question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Question {index}</h2>
      <p className="text-lg mb-6 text-gray-700">{question.description}</p>

      <div className="space-y-4">
        {question.options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className="flex items-center p-3 border rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => onAnswerSelect(optionIndex)}
          >
            <input
              type="radio"
              id={`option${optionIndex}`}
              name={`question${index}`}
              className="mr-3 h-5 w-5"
              checked={selectedAnswer === optionIndex}
              onChange={() => onAnswerSelect(optionIndex)}
            />
            <label
              htmlFor={`option${optionIndex}`}
              className="text-lg text-gray-600 cursor-pointer flex-1"
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
