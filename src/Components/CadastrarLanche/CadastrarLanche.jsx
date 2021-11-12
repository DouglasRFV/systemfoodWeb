/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { firebaseDb } from "../../firebase";
import FormularioCadastroLanche from "../FormularioCadastroLanche/FormularioCadastroLanche";
import './CadastrarLanche.css'

import Header from '../HeaderHome/Header';

const CadastrarLanche = () => {

    let [dadosLanches, setDadosLanches] = useState({});

    let [ idAtual, setIdAtual] = useState('');

    useEffect(() => {
      firebaseDb.child('lanches').on('value', dbPhoto => {
        if(dbPhoto.val() !== null) {
          setDadosLanches({
            ...dbPhoto.val()
          });
        } else {
          setDadosLanches({});
        }
      })
    }, []);

    const addEdit = obj => {
      if(idAtual === '') {
        console.log('Lanche =>', obj);
        firebaseDb.child('lanches').push(
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
        firebaseDb.child(`lanches/${idAtual}`).set(
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

    const deleteLanche = key => {
      if(window.confirm('Deseja realmente deletar esse registro?')) {
        firebaseDb.child(`lanches/${key}`).remove(
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
            <h1 className="display-4">Cadastrar Lanches</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <FormularioCadastroLanche {...({addEdit, idAtual, dadosLanches})} />
          </div>
          <div className="col-md-7">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <td>Nome Lanche</td>
                  <td>Preço</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(dadosLanches).map(id => {
                    return <tr key={id}>
                      <td>{ dadosLanches[id].nomeLanche }</td>
                      <td>{ dadosLanches[id].preco }</td>
                      <td>
                        <a className="btn btn-primary" onClick={ () => setIdAtual(id) }>
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        {'            '}
                        <a className="btn btn-danger" onClick={ () => deleteLanche(id) }>
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

export default CadastrarLanche;
