import classes from "./Questions.module.css";
import { AppContext } from "./context";
import { useContext } from "react";
import React from "react";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function Questions() {
  const ctxValue = useContext(AppContext);

  const { incorrect_answers, correct_answer } =
    ctxValue?.questions[ctxValue.index];

  const answers = shuffle([...incorrect_answers, correct_answer]);

  const answerHanlder = (e) => {
    if (e.target.innerText === correct_answer) {
      ctxValue.setCorrect((correctAnswers) => {
        return correctAnswers + 1;
      });
    }

    if (ctxValue.index < ctxValue.questions.length - 1) {
      ctxValue.setIndex((curI) => curI + 1);
    } else {
      ctxValue.setShowFinishModal(true);
      ctxValue.setSettingup(false);
    }
  };

  const nextQuestionHandler = () => {
    if (ctxValue.index < ctxValue.questions.length - 1) {
      ctxValue.setIndex((curI) => curI + 1);
    } else {
      ctxValue.setShowFinishModal(true);
    }
  };

  return (
    <main>
      <section className={classes.quiz}>
        <p className={classes.correctAnswers}>
          correct answers: {ctxValue.correct} /
          {ctxValue.showFinishModal ? ctxValue.index + 1 : ctxValue.index}
        </p>
        <article className={classes.container}>
          <h2
            dangerouslySetInnerHTML={{
              __html: ctxValue.questions[ctxValue.index].question,
            }}
          />

          <div className={classes.btnContainer}>
            {answers.map((answ, i) => {
              return (
                <button
                  onClick={answerHanlder}
                  className={classes.answerBtn}
                  dangerouslySetInnerHTML={{ __html: answers[i] }}
                ></button>
              );
            })}
          </div>
        </article>
        <button onClick={nextQuestionHandler}> Next question</button>
      </section>
    </main>
  );
}

export default Questions;
