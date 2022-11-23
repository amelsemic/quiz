import ReactDom from "react-dom";
import classes from "./Modal.module.css";
import React from "react";
import { AppContext } from "./context";
import { useContext } from "react";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const ctxValue = useContext(AppContext);
  return (
    <>
      {ReactDom.createPortal(<Backdrop />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>
          <div>
            <p>{ctxValue.generateFinishMessage()}</p>
            <button onClick={props.onNewQuiz}>Probaj opet</button>
          </div>
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
