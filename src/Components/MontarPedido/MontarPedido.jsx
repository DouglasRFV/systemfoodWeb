/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import firebase from "../../firebase";
import { useHistory } from 'react-router';
import { Toast } from "react-bootstrap";


import './MontarPedido.css';

import Header from '../HeaderHome/Header';


const MontarPedido = (props) => {

  const mesa = props.location.state.mesa;
  let total = 0;
  let [dadosLanches, setDadosLanches] = useState({});
  let [dadosBebidas, setDadosBebidas] = useState({});
  let itensPedidoLanches = [];
  let itensPedidoBebidas = [];
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const db = firebase.firestore();
  const history = useHistory();

  // let [idAtual, setIdAtual] = useState('');

  useEffect(() => {
    firebaseDb.child('lanches').on('value', dbPhoto => {
      if (dbPhoto.val() !== null) {
        setDadosLanches({
          ...dbPhoto.val()
        });
      } else {
        setDadosLanches({});
      }
    })

    firebaseDb.child('bebidas').on('value', dbPhoto => {
      if (dbPhoto.val() !== null) {
        setDadosBebidas({
          ...dbPhoto.val()
        });
      } else {
        setDadosBebidas({});
      }
    })
  }, []);


  function onChangeTable(nome, preco, qtd, tipo) {
    total = 0;
    if (tipo === 'lanche') {
      if (itensPedidoLanches.some(item => item['nomeLanche'] === nome)) {
        for (let i in itensPedidoLanches) {
          if (itensPedidoLanches[i].nomeLanche === nome) {
            itensPedidoLanches[i].qtdeLanche = qtd;
          }
        }
      } else {
        itensPedidoLanches.push({
          'nomeLanche': nome,
          'precoLanche': preco,
          'qtdeLanche': qtd
        });
      }
    } else if (tipo === 'bebida') {
      if (itensPedidoBebidas.some(item => item['nomeBebida'] === nome)) {
        for (let i in itensPedidoBebidas) {
          if (itensPedidoBebidas[i].nomeBebida === nome) {
            itensPedidoBebidas[i].qtdeBebida = qtd;
          }
        }
      } else {
        itensPedidoBebidas.push({
          'nomeBebida': nome,
          'precoBebida': preco,
          'qtdeBebida': qtd
        });
      }
    }

    itensPedidoLanches.forEach((itemPedido => {
      const valorLanches = parseFloat(itemPedido.precoLanche) * itemPedido.qtdeLanche
      total += valorLanches;
    }));

    itensPedidoBebidas.forEach((itemPedido => {
      const valorBebidas = parseFloat(itemPedido.precoBebida) * itemPedido.qtdeBebida
      total += valorBebidas;
    }));
    console.log('TOTAL', total);
    document.getElementById("total").innerHTML = `Valor do pedido:  R$${parseFloat(total).toFixed(2)}`;
  };

  function salvarPedido() {
    // console.log('MESA =>', mesa);
    // console.log('LANCHES =>', itensPedidoLanches);
    // console.log('BEBIDAS =>', itensPedidoBebidas);
    if (itensPedidoLanches.length > 0 || itensPedidoBebidas > 0) {
      try {
        db.collection('pedidos')
          .doc(mesa)
          .set({ itensPedidoLanches, itensPedidoBebidas, total: parseFloat(total).toFixed(2) });
        setShowA(true);
        setTimeout(() => {
          history.push('/realizar-pedido');
        }, 3000);
      } catch (error) {
        console.log('error', error);
      }
    }
  }

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

  return (
    <div className="container-fluid">
      <Header />
      <div className="jumbotron jumbotron-fluid jumboPadding">
        <div className="container-fluid">
          <h1 className="display-4">Montar Pedido</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/realizar-pedido">Realizar Pedidos</a></li>
            <li class="breadcrumb-item active" aria-current="page">Montar Pedido</li>
          </ol>
        </div>
      </div>
      <h4 className="mb-3">{`ITENS DO PEDIDO - MESA ${props.location.state.mesa.slice(4)}`}</h4>
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
                    <td>{dadosLanches[id].preco}</td>
                    <td>
                      <input onChange={(event) => { onChangeTable(dadosLanches[id].nomeLanche, dadosLanches[id].preco, event.target.value, 'lanche') }}
                        type="number" name="qtdeLanche" id="qtdeLanche" />
                    </td>
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
                <th className="col-md-5">Nome Lanche</th>
                <th className="col-md-4">Preço</th>
                <th className="col-md-3">Quantidade</th>
              </tr>
            </thead>
            <tbody onClick={() => onChangeTable()}>
              {
                Object.keys(dadosBebidas).map(id => {
                  return <tr key={id}>
                    <td>{dadosBebidas[id].nomeBebida}</td>
                    <td>{dadosBebidas[id].preco}</td>
                    <td>
                      <input onChange={(event) => { onChangeTable(dadosBebidas[id].nomeBebida, dadosBebidas[id].preco, event.target.value, 'bebida') }}
                        type="number" name="qtdeBebida" id="qtdeBebida" />
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-5"></div>
        <div className="col-md-6 mt-4">
          <button onClick={() => salvarPedido()} type="button" className="btn btn-primary float-right mr-2 btn-lg">Salvar Pedido</button>
        </div>
      </div>
      <div>
        <h4 id="total" className="float-right mt-2 mr-2">{`Valor do pedido:  R$${parseFloat(total).toFixed(2)}`}</h4>
      </div>
      <Toast show={showA} delay={3000} autohide onClose={toggleShowA} style={{ position: "absolute", "min-width": "300px", bottom: "1rem", left: "1rem" }}>
        <Toast.Header>
          <img
            src="/logo.png"
            className="rounded me-2"
            alt=""
            width="40" height="40"
          />
          <strong className="me-auto">SystemFood</strong>
        </Toast.Header>
        <Toast.Body><h4>Pedido salvo com sucesso!</h4></Toast.Body>
      </Toast>
    </div>

  );
}

export default MontarPedido;
