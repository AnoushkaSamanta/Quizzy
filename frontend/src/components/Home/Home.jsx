import React from "react";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import QuestionContainer from "../QuizPage/QuestionContainer";

function Home() {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <div className="w-1/2 h-full flex flex-col bg-gradient-to-r from-blue-700 to-blue-900  p-4 justify-center">
        <h1 className="text-orange-500 text-5xl font-semibold mb-10">Welcome User!</h1>
          <h1 className="text-gray-300 text-3xl font-semibold">Test your knowledge with fun and challenging quizzes!</h1>
        </div>

        <div className="w-1/2 h-full flex justify-center items-center">
          <NavLink to="/quizpage" className="px-10 py-4 rounded-full bg-blue-900 text-white text-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Start Quiz
          </NavLink>
        </div>
      </div>
      
    </>
  );
}

export default Home;
