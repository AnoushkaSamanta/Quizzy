import React from 'react';

function Question({index,question}) {
  return (
    <div className="w-1/2  mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Question:{index}</h2>
      <p className="text-lg mb-6 text-gray-700">
        {question.description}
      </p>

      <form action="" className="flex flex-col space-y-4">
        <div className="flex items-center">
          <input type="radio" id="option1" name="option" className="mr-3 h-5 w-5" />
          <label htmlFor="option1" className="text-lg text-gray-600">{question.options[0].description}</label>
        </div>

        <div className="flex items-center">
          <input type="radio" id="option2" name="option" className="mr-3 h-5 w-5" />
          <label htmlFor="option2" className="text-lg text-gray-600">{question.options[1].description}</label>
        </div>

        <div className="flex items-center">
          <input type="radio" id="option3" name="option" className="mr-3 h-5 w-5" />
          <label htmlFor="option3" className="text-lg text-gray-600">{question.options[1].description}</label>
        </div>

        <div className="flex items-center">
          <input type="radio" id="option4" name="option" className="mr-3 h-5 w-5" />
          <label htmlFor="option4" className="text-lg text-gray-600">{question.options[1].description}</label>
        </div>
      </form>
    </div>
  );
}

export default Question;
