import './Home.css';
import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../HeaderHome/Header';
import Footer from '../Footer/Footer';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    console.log('PROPS =>', props);

    return (
        <div>
            <Header/>
            <Stack gap={4} className="col-lg-5 mx-auto marginStack">
                <Button variant="primary" size="lg">Cadastrar Usuário</Button>
                <Button variant="primary" size="lg">Cadastrar Produto</Button>
                <Button variant="primary" size="lg">Realizar Pedido</Button>
                <Button variant="primary" size="lg">Pedidos em Andamento</Button>
                <Button variant="primary" size="lg">Clube de Desconto</Button>
            </Stack>
            <Footer/>
        </div>
    );
}