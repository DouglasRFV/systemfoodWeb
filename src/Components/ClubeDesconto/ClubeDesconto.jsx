import './ClubeDesconto.css';
import Header from '../HeaderHome/Header';

import { Toast } from "react-bootstrap";
import React, { useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  function chamaToast() {
    setShowA(true);
  }

  return (
    <div className="container-fluid">
      <Header />
      <div>
        <h1>Clube de Desconto</h1>
        <button onClick={() => chamaToast()}>teste</button>
      </div>

      <Toast show={showA} delay={3000} autohide onClose={toggleShowA} style={{ position: "absolute", "min-width": "300px", top: "1rem", left: "1rem" }}>
        <Toast.Header>
          <img
            src="/logo.png"
            className="rounded me-2"
            alt=""
            width="40" height="40"
          />
          <strong className="me-auto">SystemFood</strong>
        </Toast.Header>
        <Toast.Body><h6>Clubinho do caraio</h6></Toast.Body>
      </Toast>
    </div>
  )
}