/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from 'react-router';
import firebase from "../../firebase"
import { Toast } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";

import Header from '../HeaderHome/Header';

const ItensPedido = (props) => {

  let total = 0;
  const mesa = props.location.state.mesa;
  let [dadosLanches, setDadosLanches] = useState({});
  let [dadosBebidas, setDadosBebidas] = useState({});
  let itensPedidoLanches = [];
  let itensPedidoBebidas = [];
  const history = useHistory();
  const db = firebase.firestore();
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    const docRef = db.collection("pedidos").doc(mesa);

    docRef.get().then((doc) => {
      if (doc.exists) {
        total = doc.data().total;
        document.getElementById("total").innerHTML = `Valor do pedido:  R$${parseFloat(total).toFixed(2)}`;
        setDadosLanches({
          ...doc.data().itensPedidoLanches
        });

        setDadosBebidas({
          ...doc.data().itensPedidoBebidas
        });
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])

  function finalizarPedido() {
    try {
      itensPedidoLanches = [];
      itensPedidoBebidas = [];
      total = 0;
      db.collection('pedidos')
        .doc(mesa)
        .set({ itensPedidoLanches, itensPedidoBebidas, total });
      setShowA(true);
      setTimeout(() => {
        history.push('/realizar-pedido');
      }, 3000);
    } catch (error) {
      console.log('error', error);
    }
  }

  let [dadosClientes, setDadosClientes] = useState([]);
  let [cpfClientes] = useState([]);
  let [arrayCompras] = useState([]);
  let totalCompras = 0;

  useEffect(() => {
    firebaseDb.child('clube-desconto').on('value', dados => {
      if (dados.val() !== null) {
        setDadosClientes({
          ...dados.val()
        });
        const clientes = dados.val();
        Object.keys(clientes).map(id => {
          cpfClientes.push(clientes[id].cpfCliente);
          arrayCompras.push({ 
            "id": id, 
            "cpfCliente": clientes[id].cpfCliente, 
            "qtdeCompras": clientes[id].qtdeCompras 
          });
          return clientes;
        })
      } else {
        setDadosClientes([]);
      }
    })
  }, []);

  function calculaDesconto() {
    const cpf = document.getElementById("cpf").value;
    const resultCliente = arrayCompras.find(({ cpfCliente }) => cpfCliente === cpf);
    const id = resultCliente.id;

    if (resultCliente.qtdeCompras > 10 || resultCliente.qtdeCompras + 1 === 10) {
      const docRef = db.collection("pedidos").doc(mesa);
      docRef.get().then((doc) => {
        if (doc.exists) {
          total = parseFloat(doc.data().total);
          if (cpfClientes.includes(cpf)) {
            const totalComDesconto = total - (total * 0.30);
            document.getElementById("total").innerHTML = `Valor do pedido:  R$${parseFloat(totalComDesconto).toFixed(2)}`;
          }
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      firebaseDb.child(`clube-desconto/${id}`).update(
        { 'qtdeCompras': 0 },
        error => {
          if (error) {
            console.log('error =>', error);
          }
        }
      )
    } else {
      firebaseDb.child(`clube-desconto/${id}`).update(
        { 'qtdeCompras': resultCliente.qtdeCompras + 1 },
        error => {
          if (error) {
            console.log('error =>', error);
          }
        }
      );
    }
  }

  return (
    <div className="container-fluid">
      <Header />
      <div className="jumbotron jumbotron-fluid jumboPadding">
        <div className="container-fluid">
          <h1 className="display-4">Itens do Pedido</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/pedidos-andamento">Pedidos em Andamento</a></li>
            <li className="breadcrumb-item active" aria-current="page">Itens do pedido</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h6 className="float-right mt-2">Aplicar clube de desconto?</h6>
        </div>
        <div className="form-group input-group col-md-4">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-duotone fa-id-card"></i>
            </div>
          </div>
          <input id="cpf" className="form-control" placeholder="CPF" name="cpf" />
          <button onClick={() => calculaDesconto()} type="button" className="btn btn-primary">Desconto</button>
        </div>
      </div>
      <h4 className="mb-3">{`ITENS DO PEDIDO - MESA ${mesa.slice(4)}`}</h4>
      <div className="row">
        <div className="col-md-6">
          <h5>LANCHES</h5>
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th className="col-md-5">Nome Lanche</th>
                <th className="col-md-4">Preço</th>
                <th className="col-md-3">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dadosLanches).map(id => {
                  return <tr key={id}>
                    <td>{dadosLanches[id].nomeLanche}</td>
                    <td>{dadosLanches[id].precoLanche}</td>
                    <td>{dadosLanches[id].qtdeLanche}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5>BEBIDAS</h5>
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th className="col-md-5">Nome Bebida</th>
                <th className="col-md-4">Preço</th>
                <th className="col-md-3">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dadosBebidas).map(id => {
                  return <tr key={id}>
                    <td>{dadosBebidas[id].nomeBebida}</td>
                    <td>{dadosBebidas[id].precoBebida}</td>
                    <td>{dadosBebidas[id].qtdeBebida}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6 mb-3">
          <button onClick={() => finalizarPedido()} type="button" className="btn btn-dark float-right btn-lg">Finalizar Pedido</button>
          <h4 id="total" className="float-right mt-2 mr-2">{`Valor do pedido:  R$${total}`}</h4>
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
        <Toast.Body><h4>Pedido finalizado!</h4></Toast.Body>
      </Toast>
    </div>
  )
}

export default ItensPedido;
