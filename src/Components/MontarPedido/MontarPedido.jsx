/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import InputSpinner from 'react-bootstrap-input-spinner'
import './MontarPedido.css'

import Header from '../HeaderHome/Header';


const MontarPedido = (props) => {

  let total = 150.00;
  let [dadosLanches, setDadosLanches] = useState({});
  let [dadosBebidas, setDadosBebidas] = useState({});

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

  const value = 0;

  console.log('PROPS =>', props.location.state);
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
                <th className="col-md-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dadosLanches).map(id => {
                  return <tr key={id}>
                    <td>{dadosLanches[id].nomeLanche}</td>
                    <td>{dadosLanches[id].preco}</td>
                    <td>
                      <InputSpinner
                        type={'real'}
                        precision={2}
                        max={100}
                        min={0}
                        step={1}
                        value={value}
                        onChange={num => console.log(num)}
                        variant={'dark'}
                        size="sm"
                      />
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
                <th className="col-md-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dadosBebidas).map(id => {
                  return <tr key={id}>
                    <td>{dadosBebidas[id].nomeBebida}</td>
                    <td>{dadosBebidas[id].preco}</td>
                    <td>
                      <InputSpinner
                        type={'real'}
                        precision={2}
                        max={100}
                        min={0}
                        step={1}
                        value={value}
                        onChange={num => console.log(num)}
                        variant={'dark'}
                        size="sm"
                      />
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
          <button type="button" className="btn btn-primary float-right mr-5 btn-lg">Finalizar Pedido</button>
          <h4 className="float-right mr-5 mt-2">{`Valor do pedido:  R$${total}`}</h4>
        </div>
      </div>
    </div>
  );
}

export default MontarPedido;
