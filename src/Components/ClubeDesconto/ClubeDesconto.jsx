/* eslint-disable jsx-a11y/anchor-is-valid */
import './ClubeDesconto.css';
import Header from '../HeaderHome/Header';

import { Toast } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import FormularioCadastroClube from "../FormularioCadastroClube/FormularioCadastroClube";
import { i18n } from '../../translate/i18n';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  let [dadosClientes, setDadosClientes] = useState({});

  let [idAtual, setIdAtual] = useState('');

  useEffect(() => {
    firebaseDb.child('clube-desconto').on('value', dbPhoto => {
      if (dbPhoto.val() !== null) {
        setDadosClientes({
          ...dbPhoto.val()
        });
      } else {
        setDadosClientes({});
      }
    })
  }, []);

  const addEdit = obj => {
    if (idAtual === '') {
      console.log('Cliente =>', obj);
      firebaseDb.child('clube-desconto').push(
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
      firebaseDb.child(`clube-desconto/${idAtual}`).set(
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

  const deleteLanche = key => {
    if (window.confirm('Deseja realmente deletar esse registro?')) {
      firebaseDb.child(`clube-desconto/${key}`).remove(
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
          <h1 className="display-4">{i18n.t('titles.clubeDesconto')}</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">{i18n.t('titles.clubeDesconto')}</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <FormularioCadastroClube {...({ addEdit, idAtual, dadosClientes })} />
        </div>
        <div className="col-md-7">
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <td>{i18n.t('formTitles.nomeCliente')}</td>
                <td>{i18n.t('formTitles.documento')}</td>
                <td>{i18n.t('formTitles.telefone')}</td>
                <td>{i18n.t('formTitles.qtdeCompras')}</td>
                <td>{i18n.t('titles.acoes')}</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dadosClientes).map(id => {
                  const cpfCliente = dadosClientes[id].cpfCliente.substring(0, 3) + ".***.***-" + dadosClientes[id].cpfCliente.substring(9, dadosClientes[id].cpfCliente.length);
                  const telefoneCliente =  `(${dadosClientes[id].telefoneCliente.substring(0, 2)})${dadosClientes[id].telefoneCliente.substring(2, 7)}-${dadosClientes[id].telefoneCliente.substring(7, dadosClientes[id].telefoneCliente.length)}`
                  return <tr key={id}>
                    <td>{dadosClientes[id].nomeCliente}</td>
                    <td>{cpfCliente}</td>
                    <td>{telefoneCliente}</td>
                    <td>{dadosClientes[id].qtdeCompras}</td>
                    <td>
                      <a className="btn btn-primary" onClick={() => setIdAtual(id)}>
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      {'            '}
                      <a className="btn btn-danger" onClick={() => deleteLanche(id)}>
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