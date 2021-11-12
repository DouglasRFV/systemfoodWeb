/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import FormularioCadastroBebida from "../FormularioCadastroBebida/FormularioCadastroBebida";
import './CadastrarBebida.css'

import Header from '../HeaderHome/Header';

const CadastrarBebida = () => {

    let [dadosBebidas, setDadosBebidas] = useState({});

    let [ idAtual, setIdAtual] = useState('');

    useEffect(() => {
      firebaseDb.child('bebidas').on('value', dbPhoto => {
        if(dbPhoto.val() !== null) {
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
        console.log('Bebida =>', obj);
        firebaseDb.child('bebidas').push(
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
        firebaseDb.child(`bebidas/${idAtual}`).set(
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

    const deleteBebida = key => {
      if(window.confirm('Deseja realmente deletar esse registro?')) {
        firebaseDb.child(`bebidas/${key}`).remove(
          error => {
            if(error) {
              console.log('error =>', error);
            }
          }
        );
      }
    }

    return (
      <div className="container-fluid">
        <Header/>
        <div className="jumbotron jumbotron-fluid jumboPadding">
          <div className="container-fluid">
            <h1 className="display-4">Cadastrar Bebidas</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <FormularioCadastroBebida {...({addEdit, idAtual, dadosBebidas})} />
          </div>
          <div className="col-md-7">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <td>Nome Bebida</td>
                  <td>Preço</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(dadosBebidas).map(id => {
                    return <tr key={id}>
                      <td>{ dadosBebidas[id].nomeBebida }</td>
                      <td>{ dadosBebidas[id].preco }</td>
                      <td>
                        <a className="btn btn-primary" onClick={ () => setIdAtual(id) }>
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        {'            '}
                        <a className="btn btn-danger" onClick={ () => deleteBebida(id) }>
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    )
}

export default CadastrarBebida;
