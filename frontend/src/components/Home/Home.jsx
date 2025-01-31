import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../Header/Header";

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] text-white overflow-hidden">
      <Header />

      <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col items-center text-center">
        <h1
          className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text 
          bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse"
        >
          Brain Boost
        </h1>

        <p className="text-lg text-gray-300 mt-6 w-2xl">
          Challenge your mind with cutting-edge quizzes. Dive into knowledge,
          track your progress, and level up your intellect.
        </p>

        <NavLink
          to="/quizpage"
          className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 
            text-white font-semibold rounded-full shadow-lg 
            hover:shadow-2xl hover:scale-105 transition-transform duration-300 
            flex items-center gap-2"
        >
          Start Quiz
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 transition-transform transform group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </NavLink>
        <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
          <div className="w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-[120px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
