/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import './MontarPedido.css'

import Header from '../HeaderHome/Header';


const MontarPedido = (props) => {

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
                <td>Nome Lanche</td>
                <td>Preço</td>
                <td>Ações</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lanche 01</td>
                <td>50.00</td>
                <td>
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-danger"><i className="fas fa-circle-minus"></i></button>
                    <input className="test" type="text" name="" id="" />
                    <button type="button" class="btn btn-success"><i className="fas fa-circle-plus"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5>BEBIDAS</h5>
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <td>Nome Lanche</td>
                <td>Preço</td>
                <td>Ações</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lanche 01</td>
                <td>50.00</td>
                <td>
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-danger"><i className="fas fa-circle-minus"></i></button>
                    <input className="test" type="text" name="" id="" />
                    <button type="button" class="btn btn-success"><i className="fas fa-circle-plus"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MontarPedido;
