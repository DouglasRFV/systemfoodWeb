/* eslint-disable jsx-a11y/anchor-is-valid */
import './ClubeDesconto.css';
import Header from '../HeaderHome/Header';

import { Toast } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import FormularioCadastroClube from "../FormularioCadastroClube/FormularioCadastroClube";

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
          <h1 className="display-4">Clube de Desconto</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Clube de Desconto</li>
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
                <td>Nome do Cliente</td>
                <td>CPF</td>
                <td>Telefone</td>
                <td>Ações</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dadosClientes).map(id => {
                  return <tr key={id}>
                    <td>{dadosClientes[id].nomeCliente}</td>
                    <td>{dadosClientes[id].cpfCliente}</td>
                    <td>{dadosClientes[id].telefoneCliente}</td>
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