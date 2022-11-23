import React from "react";
import { useContext } from "react";
import { AppContext } from "./context";

const category = {
  sports: 21,
  history: 23,
  politics: 24,
  geography: 22,
  general: 9,
  movies: 11,
  music: 12,
};

const SetupForm = () => {
  const ctxValue = useContext(AppContext);

  const startHandler = (event) => {
    event.preventDefault();

    let qstnAmount = event.target.elements.numQuestions.value;
    let difficulty = event.target.elements.difficulty.value;
    let numberOfCategory = category[event.target.elements.category.value];

    ctxValue.fetchQuestions(qstnAmount, numberOfCategory, difficulty);
    ctxValue.setSettingup(false);
  };

  return (
    <div>
      <form onSubmit={startHandler}>
        <h2>Setup Quiz</h2>
        <section id="Number of questions">
          <h3>Number of questions</h3>
          <input
          defaultValue={"1"}
            /* placeholder="1" */
            name="numQuestions"
            type="number"
            min="1"
            max="50"
          />
          
        </section>
        <section id="category">
          <h3>Category</h3>
          <select name="category">
            <option>general</option>
            <option>sports</option>
            <option>history</option>
            <option>politics</option>
            <option>geography</option>
            <option>movies</option>
            <option>music</option>
          </select>
        </section>
        <section id="difficulty">
          <h3>Set difficulty</h3>
          <select name="difficulty">
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
          {ctxValue.error && (<p className="error">
            Cant generate questions, please try different options
          </p>)}
        </section>
        <button type="submit">Start!</button>
      </form>
    </div>
  );
};

export default SetupForm;
