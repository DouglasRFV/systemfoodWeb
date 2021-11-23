/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import FormularioCadastroLanche from "../FormularioCadastroLanche/FormularioCadastroLanche";
import './CadastrarLanche.css';
import { i18n } from '../../translate/i18n';

import Header from '../HeaderHome/Header';

const CadastrarLanche = () => {

  let [dadosLanches, setDadosLanches] = useState({});

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
  }, []);

  const addEdit = obj => {
    if (idAtual === '') {
      console.log('Lanche =>', obj);
      firebaseDb.child('lanches').push(
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
      firebaseDb.child(`lanches/${idAtual}`).set(
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
    if (window.confirm(`${i18n.t('messages.confirmDelete')}`)) {
      firebaseDb.child(`lanches/${key}`).remove(
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
            <h1 className="display-4">{i18n.t('titles.cadastrarLanches')}</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">{i18n.t('titles.home')}</a></li>
              <li className="breadcrumb-item"><a href="/cadastrar-produtos">{i18n.t('titles.cadastrarProdutos')}</a></li>
              <li className="breadcrumb-item active" aria-current="page">{i18n.t('titles.cadastrarLanches')}</li>
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <FormularioCadastroLanche {...({ addEdit, idAtual, dadosLanches })} />
          </div>
          <div className="col-md-7">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <td>{i18n.t('formTitles.nomeLanche')}</td>
                  <td>{i18n.t('formTitles.precoLanche')}</td>
                  <td>{i18n.t('titles.acoes')}</td>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(dadosLanches).map(id => {
                    return <tr key={id}>
                      <td>{dadosLanches[id].nomeLanche}</td>
                      <td>{dadosLanches[id].preco}</td>
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
        {/* <Footer/> */}
      </div>
    </>
  )
}

export default CadastrarLanche;
