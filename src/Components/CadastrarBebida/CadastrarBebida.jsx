/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import FormularioCadastroBebida from "../FormularioCadastroBebida/FormularioCadastroBebida";
import { i18n } from '../../translate/i18n';

import Header from '../HeaderHome/Header';

const CadastrarBebida = () => {

  let [dadosBebidas, setDadosBebidas] = useState({});

  let [idAtual, setIdAtual] = useState('');

  useEffect(() => {
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
    if (idAtual === '') {
      console.log('Bebida =>', obj);
      firebaseDb.child('bebidas').push(
        obj,
        error => {
          if (error) {
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
          if (error) {
            console.log('error =>', error);
          } else {
            setIdAtual('');
          }
        }
      )
    }
  }

  const deleteBebida = key => {
    if (window.confirm(`${i18n.t('messages.confirmDelete')}`)) {
      firebaseDb.child(`bebidas/${key}`).remove(
        error => {
          if (error) {
            console.log('error =>', error);
          }
        }
      );
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="jumbotron jumbotron-fluid jumboPadding">
          <div className="container-fluid">
            <h1 className="display-4">{i18n.t('titles.cadastrarBebidas')}</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">{i18n.t('titles.home')}</a></li>
              <li className="breadcrumb-item"><a href="/cadastrar-produtos">{i18n.t('titles.cadastrarProdutos')}</a></li>
              <li className="breadcrumb-item active" aria-current="page">{i18n.t('titles.cadastrarBebidas')}</li>
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <FormularioCadastroBebida {...({ addEdit, idAtual, dadosBebidas })} />
          </div>
          <div className="col-md-7">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <td>{i18n.t('formTitles.nomeBebida')}</td>
                  <td>{i18n.t('formTitles.precoBebida')}</td>
                  <td>{i18n.t('titles.acoes')}</td>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(dadosBebidas).map(id => {
                    return <tr key={id}>
                      <td>{dadosBebidas[id].nomeBebida}</td>
                      <td>{dadosBebidas[id].preco}</td>
                      <td>
                        <a className="btn btn-primary" onClick={() => setIdAtual(id)}>
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        {'            '}
                        <a className="btn btn-danger" onClick={() => deleteBebida(id)}>
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
      </div>
    </>

  )
}

export default CadastrarBebida;
