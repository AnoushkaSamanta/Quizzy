import React, { useEffect, useState } from "react";
import Question from "./Question";

function Questions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/Uw5CrX"); // Use the proxy prefix `/api`
      const data = await response.json();
    //   console.log(data.questions);
      setQuestions(data.questions);
    } catch (error) {
      console.log("Error fetching questions from API", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {questions.length > 0 ? (
        questions.map((question, index) => <Question key={index} index={index+1} question={question}/>)
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default Questions;
