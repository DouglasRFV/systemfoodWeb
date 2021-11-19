/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from 'react-router';
import firebase from "../../firebase"
import { Toast } from "react-bootstrap";
import React, { useState } from "react";

import './RealizarPedido.css'
import Header from '../HeaderHome/Header';

const RealizarPedido = () => {

  const history = useHistory();
  const db = firebase.firestore();
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  async function getPedido(mesa) {
    const docRef = db.collection("pedidos").doc(mesa);
    const dataUser = {};

    await docRef.get().then((doc) => {
      if (doc.exists) {
        const itensPedidoLanches = doc.data().itensPedidoLanches;
        const itensPedidoBebidas = doc.data().itensPedidoBebidas;
        if (itensPedidoLanches.length === 0 && itensPedidoBebidas.length === 0) {
          history.push({ pathname: '/montar-pedido', state: { 'mesa': mesa } })
        } else {
          setShowA(true);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    ).catch((error) => {
      console.log("Error getting document:", error);
    });
    return dataUser;
  }


  return (
    <div className="container-fluid">
      <Header />
      <div className="jumbotron jumbotron-fluid jumboPadding">
        <div className="container-fluid">
          <h1 className="display-4">Realizar Pedidos</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Realizar Pedidos</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <h4>Mesas</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="submit" onClick={() => getPedido('mesa01')} value={'MESA 01'} className="btn btn-primary btn-lg btn-block p-3" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="submit" onClick={() => getPedido('mesa02')} value={'MESA 02'} className="btn btn-primary btn-lg btn-block p-3" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="submit" onClick={() => getPedido('mesa03')} value={'MESA 03'} className="btn btn-primary btn-lg btn-block p-3" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="submit" onClick={() => getPedido('mesa04')} value={'MESA 04'} className="btn btn-primary btn-lg btn-block p-3" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="submit" onClick={() => getPedido('mesa05')} value={'MESA 05'} className="btn btn-primary btn-lg btn-block p-3" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="submit" onClick={() => getPedido('mesa06')} value={'MESA 06'} className="btn btn-primary btn-lg btn-block p-3" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
        </div>
      </div>
      <Toast show={showA} delay={3000} autohide onClose={toggleShowA} style={{ position: "absolute", "min-width": "300px", bottom: "1rem", right: "1rem" }}>
        <Toast.Header>
          <img
            src="/logo.png"
            className="rounded me-2"
            alt=""
            width="40" height="40"
          />
          <strong className="me-auto">SystemFood</strong>
        </Toast.Header>
        <Toast.Body><h4>Pedido em andamento para esta mesa!</h4></Toast.Body>
      </Toast>
    </div>
  )
}

export default RealizarPedido;
