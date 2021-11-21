import './Home.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';

import Header from '../HeaderHome/Header';
import Footer from '../Footer/Footer';
import { i18n } from '../../translate/i18n';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    
    
    const history = useHistory();
    const localTypeUser = localStorage.getItem('typeUser');
    const typeUser = props.location.state ? props.location.state : localTypeUser;
    
    return (
      typeUser === 'admin' ?
        <div>
            <Header/>
            <div className="d-grid gap-2 marginStack">
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/cadastrar-produtos')}>{i18n.t('buttons.home.cadastrar-produto')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/realizar-pedido')}>{i18n.t('buttons.home.realizar-pedido')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/pedidos-andamento')}>{i18n.t('buttons.home.pedidos-andamento')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/clube-desconto')}>{i18n.t('buttons.home.clube-desconto')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/controle-usuarios')}>{i18n.t('buttons.home.cadastro-usuario')}</Button>
            </div>
            <Footer/>
        </div>
      : 
      <div>
            <Header/>
            <div className="d-grid gap-2 marginStack">
            <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/cadastrar-produtos')}>{i18n.t('buttons.home.cadastrar-produto')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/realizar-pedido')}>{i18n.t('buttons.home.realizar-pedido')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/pedidos-andamento')}>{i18n.t('buttons.home.pedidos-andamento')}</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/clube-desconto')}>{i18n.t('buttons.home.clube-desconto')}</Button>
            </div>
            <Footer/>
        </div>
    );
}
