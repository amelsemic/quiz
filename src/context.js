import React, { useState } from "react";
const AppContext = React.createContext();

const AppProvider = (props) => {
  const [settingup, setSettingup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const generateFinishMessage = (questionsAmount = questions.length) => {
    let correctPercentage = (correct / questionsAmount).toFixed(2);
    if (correctPercentage <= 0.5)
      return `Unfortunately, you had only ${
        correctPercentage * 100
      }% correct answers.`;
    else if (correctPercentage > 0.5 && correctPercentage < 0.75)
      return `Not bad! You had ${correctPercentage * 100}% correct answers.`;
    else if (correctPercentage >= 0.75)
      return `Great job! You had ${correctPercentage * 100}% correct answers!`;
  };

  const fetchQuestions = async (questionsAmount, category, difficulty) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${questionsAmount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json();
      if (data?.results?.length > 0) {
        setQuestions(data.results);
        setFetched(true)
        setError(false)
      } 
      else {
        setError(true);
        setSettingup(true)
        /* throw error("No questions for this combination"); */
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const ctxValue = {
    index,
    setIndex,
    error,
    fetchQuestions,
    settingup,
    setSettingup,
    fetched,
    setFetched,
    loading,
    questions,
    correct,
    setCorrect,
    generateFinishMessage,
    showFinishModal,
    setShowFinishModal,
  };
  return (
    <AppContext.Provider value={ctxValue}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
