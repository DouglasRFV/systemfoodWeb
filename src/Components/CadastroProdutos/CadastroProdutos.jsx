/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory } from 'react-router';

import Header from '../HeaderHome/Header';

const CadastrarProdutos = () => {

  const history = useHistory();

  return (
    <div className="container-fluid">
      <Header />
      <div className="jumbotron jumbotron-fluid jumboPadding">
        <div className="container-fluid">
          <h1 className="display-4">Cadastrar Produtos</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Cadastrar produtos</li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5 card ml-5 mr-5">
          <div className ="card-body">
          <h5 className ="card-title">Cadastrar Lanche</h5>
          <p className ="card-text">Clique para acessar o formulário de adastro de lanches.</p>
          <a onClick={() => history.push('/cadastrar-lanche')} className ="btn btn-primary">Cadastrar</a>
          </div>
        </div>

        <div className="col-md-5 card ml-5 mr-5">
          <div className ="card-body">
          <h5 className ="card-title">Cadastrar Bebida</h5>
          <p className ="card-text">Clique para acessar o formulário de adastro de bebidas.</p>
          <a onClick={() => history.push('/cadastrar-bebida')} className ="btn btn-primary">Cadastrar</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastrarProdutos;
