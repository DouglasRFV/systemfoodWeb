/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory } from 'react-router';
import { i18n } from '../../translate/i18n';

import Header from '../HeaderHome/Header';

const CadastrarProdutos = () => {

  const history = useHistory();

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="jumbotron jumbotron-fluid jumboPadding">
          <div className="container-fluid">
            <h1 className="display-4">{i18n.t('titles.cadastrarProdutos')}</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">{i18n.t('titles.cadastrarProdutos')}</li>
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 card ml-5 mr-5">
            <div className="card-body">
              <h5 className="card-title">{i18n.t('titles.cadastrarLanches')}</h5>
              <p className="card-text">{i18n.t('messages.textLanche')}</p>
              <a onClick={() => history.push('/cadastrar-lanche')} className="btn btn-primary">{i18n.t('buttons.cadastrar')}</a>
            </div>
          </div>

          <div className="col-md-5 card ml-5 mr-5">
            <div className="card-body">
              <h5 className="card-title">{i18n.t('titles.cadastrarBebidas')}</h5>
              <p className="card-text">{i18n.t('messages.textBebida')}</p>
              <a onClick={() => history.push('/cadastrar-bebida')} className="btn btn-primary">{i18n.t('buttons.cadastrar')}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CadastrarProdutos;
