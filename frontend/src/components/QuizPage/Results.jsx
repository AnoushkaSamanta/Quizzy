// import React, { useState } from "react";

// function Results({ questions, userAnswers, onRestartQuiz,correctMarks,negativeMarks }) {

//    const [correctAnswers,setCorrectAnswers]=useState([0,0,0,0,0,0,0,0,0,0])
//   const calculateStats = () => {
//     let correct = 0;
//     let incorrect = 0;
//     let unattempted = 0;
//     let score=0;

//     questions.forEach((question, index) => {
//       let correctAns = 0;
//       if (question.options[0].is_correct) {
//         correctAns = 0;
//       } else if (question.options[1].is_correct) {
//         correctAns = 1;
//       } else if (question.options[2].is_correct) {
//         correctAns = 2;
//       } else if (question.options[3].is_correct) {
//         correctAns = 3;
//       }
//       if (userAnswers[index] === undefined) {
//         unattempted++;
//       } else if (userAnswers[index] === correctAns) {
//         correct++;
//         setCorrectAnswers(prev => {
//             const updatedAnswers = [...prev]; 
//             updatedAnswers[index] = 1;
//             return updatedAnswers; 
//         });
//       } else {
//         incorrect++;
//       }
//     });

//     return { correct, incorrect, unattempted };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold mb-6">Quiz Results</h2>
//             <div className="grid grid-cols-3 gap-4 text-center">
//               <div className="bg-green-100 p-4 rounded-lg">
//                 <p className="text-green-600 text-xl font-semibold">
//                   {stats.correct}
//                 </p>
//                 <p className="text-green-600">Correct</p>
//               </div>
//               <div className="bg-red-100 p-4 rounded-lg">
//                 <p className="text-red-600 text-xl font-semibold">
//                   {stats.incorrect}
//                 </p>
//                 <p className="text-red-600">Incorrect</p>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="text-gray-600 text-xl font-semibold">
//                   {stats.unattempted}
//                 </p>
//                 <p className="text-gray-600">Unattempted</p>
//               </div>
//             </div>
//             <p className="text-center mt-4 text-lg">
//               Final Score:{" "}
//               {(stats.correct*4)-(stats.incorrect)}/ 40
//             </p>
//           </div>



//           <button
//             onClick={onRestartQuiz}
//             className="mt-8 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Restart Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Results;



import React, { useState, useEffect } from "react";

function Results({ questions, userAnswers, onRestartQuiz, correctMarks, negativeMarks }) {
  const [correctAnswers, setCorrectAnswers] = useState(new Array(10).fill(0));
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, unattempted: 0 });

  useEffect(() => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let newCorrectAnswers = new Array(10).fill(0);

    questions.forEach((question, index) => {
      let correctAns = question.options.findIndex((option) => option.is_correct);
      
      if (userAnswers[index] === undefined) {
        unattempted++;
      } else if (userAnswers[index] === correctAns) {
        correct++;
        newCorrectAnswers[index] = 1;
      } else {
        incorrect++;
      }
    });

    setStats({ correct, incorrect, unattempted });
    setCorrectAnswers(newCorrectAnswers);
  }, [questions, userAnswers]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Quiz Results</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-600 text-xl font-semibold">{stats.correct}</p>
                <p className="text-green-600">Correct</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-600 text-xl font-semibold">{stats.incorrect}</p>
                <p className="text-red-600">Incorrect</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-xl font-semibold">{stats.unattempted}</p>
                <p className="text-gray-600">Unattempted</p>
              </div>
            </div>
            <p className="text-center mt-4 text-lg">
              Final Score: {(stats.correct * 4) - stats.incorrect} / 40
            </p>
          </div>

          <button
            onClick={onRestartQuiz}
            className="mt-8 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;

