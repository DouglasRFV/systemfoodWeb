/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { firebaseDb } from "../../firebase";
import { useHistory } from 'react-router';

import './RealizarPedido.css'
import Header from '../HeaderHome/Header';

const RealizarPedido = () => {

    // let [dadosPedidos, setDadosPedidos] = useState({});

    // let [ idAtual, setIdAtual] = useState('');

    // useEffect(() => {
    //   firebaseDb.child('pedidos').on('value', dbPhoto => {
    //     if(dbPhoto.val() !== null) {
    //       setDadosPedidos({
    //         ...dbPhoto.val()
    //       });
    //     } else {
    //       setDadosPedidos({});
    //     }
    //   })
    // }, []);

    // const addEdit = obj => {
    //   if(idAtual === '') {
    //     console.log('Pedido =>', obj);
    //     firebaseDb.child('pedidos').push(
    //       obj,
    //       error => {
    //         if(error) {
    //           console.log('error =>', error);
    //         } else {
    //           setIdAtual('');
    //         }
    //       }
    //     )
    //   } else {
    //     firebaseDb.child(`pedidos/${idAtual}`).set(
    //       obj,
    //       error => {
    //         if(error) {
    //           console.log('error =>', error);
    //         } else {
    //           setIdAtual('');
    //         }
    //       }
    //     )
    //   }
    // }

    // const deletePedido = key => {
    //   if(window.confirm('Deseja realmente deletar esse registro?')) {
    //     firebaseDb.child(`pedidos/${key}`).remove(
    //       error => {
    //         if(error) {
    //           console.log('error =>', error);
    //         }
    //       }
    //     );
    //   }
    // }

    // const [isModalVisible, setIsModalVisible] = useState(false);
    const history = useHistory();


    return (
      <div className="container-fluid">
        <Header/>
        <div className="jumbotron jumbotron-fluid jumboPadding">
          <div className="container-fluid">
            <h1 className="display-4">Realizar Pedidos</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <h4>Mesas</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="submit" onClick={() => history.push({pathname: '/montar-pedido', state: {mesa: 'MESA 01'}})} value={'MESA 01'} className="btn btn-primary btn-lg btn-block p-3" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="submit" onClick={() => history.push({pathname: '/montar-pedido', state: {mesa: 'MESA 02'}})} value={'MESA 02'} className="btn btn-primary btn-lg btn-block p-3" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="submit" onClick={() => history.push({pathname: '/montar-pedido', state: {mesa: 'MESA 03'}})} value={'MESA 03'} className="btn btn-primary btn-lg btn-block p-3" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="submit" onClick={() => history.push({pathname: '/montar-pedido', state: {mesa: 'MESA 04'}})} value={'MESA 04'} className="btn btn-primary btn-lg btn-block p-3" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="submit" onClick={() => history.push({pathname: '/montar-pedido', state: {mesa: 'MESA 05'}})} value={'MESA 05'} className="btn btn-primary btn-lg btn-block p-3" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="submit" onClick={() => history.push({pathname: '/montar-pedido', state: {mesa: 'MESA 06'}})} value={'MESA 06'} className="btn btn-primary btn-lg btn-block p-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h4>Itens Pedido</h4>
          </div>
        </div>
      </div>
    )
}

export default RealizarPedido;
