import React, { useContext } from "react";
import { AppContext } from "./context";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import Questions from "./Questions";

function App() {
  const ctxValue = useContext(AppContext);

  const newQuizHandler = () => {
    ctxValue.setCorrect(0);
    ctxValue.setIndex(0);
    ctxValue.setShowFinishModal(false);
    ctxValue.setSettingup(true);
  };

  return (
    <main>
      {ctxValue.settingup && <SetupForm />}
      {ctxValue.loading && !ctxValue.error && <Loading />}
      {ctxValue.showFinishModal && !ctxValue.error && <Modal onNewQuiz={newQuizHandler} />}
      {ctxValue.fetched && !ctxValue.settingup && !ctxValue.error && <Questions />}
    </main>
  );

}

export default App;
