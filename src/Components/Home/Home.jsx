import './Home.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';

import Header from '../HeaderHome/Header';
import Footer from '../Footer/Footer';
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    
    
    const history = useHistory();
    
    console.log('PROPS =>', props);

    return (
        <div>
            <Header/>
            <div className="d-grid gap-2 marginStack">
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/cadastrar-lanche')}>Lanches</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/realizar-pedido')}>Realizar Pedido</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/pedidos-andamento')}>Pedidos em Andamento</Button>
                <Button variant="primary" size="lg" className="mb-4" onClick={() => history.push('/clube-desconto')}>Clube de Desconto</Button>
            </div>
            <Footer/>
        </div>
    );
}