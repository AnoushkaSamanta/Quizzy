import React from "react";
import Header from "../Header/Header";

function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0A192F] text-white flex flex-col items-center justify-center">
        <div className="bg-[#112240] p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h1 className="text-3xl font-bold text-cyan-400">About Quizzy</h1>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Quizzy is an interactive platform designed to challenge your 
            knowledge and help you learn in a fun way! Compete with friends, 
            track your progress, and explore exciting quizzes across various topics.
          </p>
        </div>
        <p className="mt-10 text-gray-400 text-sm">
          Built with ❤️ by Anoushka...
        </p>
      </div>
    </>
  );
}

export default About;
