/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import InputSpinner from 'react-bootstrap-input-spinner'
import './MontarPedido.css';

import Header from '../HeaderHome/Header';


const MontarPedido = (props) => {

  const mesa = props.location.state;
  let total = 150.00;
  let [dadosLanches, setDadosLanches] = useState({});
  let [dadosBebidas, setDadosBebidas] = useState({});
  let itensPedidoLanches = [];
  let itensPedidoBebidas = [];


  let [idAtual, setIdAtual] = useState('');

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

  const addEdit = obj => {
    if(idAtual === '') {
      console.log('Pedido =>', obj);
      firebaseDb.child('pedidos').push(
        obj,
        error => {
          if(error) {
            console.log('error =>', error);
          } else {
            setIdAtual('');
          }
        }
      )
    } else {
      firebaseDb.child(`pedidos/${idAtual}`).set(
        obj,
        error => {
          if(error) {
            console.log('error =>', error);
          } else {
            setIdAtual('');
          }
        }
      )
    }
  }

  function onChangeTable(nome, preco, qtd, tipo) {
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
  };

  function finalizarPedido(mesa) {
    console.log('MESA =>', mesa);
    // console.log('LANCHES =>', itensPedidoLanches);
    itensPedidoLanches.forEach((itemPedido => {
      console.log('ITEN PEDIDO =>', itemPedido);
    }));

    itensPedidoBebidas.forEach((itemPedido => {
      console.log('ITEN PEDIDO =>', itemPedido);
    }));
    // console.log('BEBIDAS =>', itensPedidoBebidas);

  }

  return (
    <div className="container-fluid">
      <Header />
      <div className="jumbotron jumbotron-fluid jumboPadding">
        <div className="container-fluid">
          <h1 className="display-4">Montar Pedido</h1>
        </div>
      </div>
      <h4 className="mb-3">{`ITENS DO PEDIDO - ${props.location.state.mesa}`}</h4>
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
        <div className="col-md-6 mt-5">
          <button onClick={() => { finalizarPedido(mesa) }} type="button" className="btn btn-primary float-right mr-5 btn-lg">Finalizar Pedido</button>
          <h4 className="float-right mr-5 mt-2">{`Valor do pedido:  R$${total}`}</h4>
        </div>
      </div>
    </div>

  );
}

export default MontarPedido;
