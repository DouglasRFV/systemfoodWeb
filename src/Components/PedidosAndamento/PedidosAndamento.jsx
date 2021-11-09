import React from "react";
import Header from '../HeaderHome/Header';
import Footer from '../Footer/Footer';
import './PedidosAndamento.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  return (
    <div>
      <Header/>
      <div>
        <h1>Pedidos em Andamento</h1>
      </div>
      <Footer/>
    </div>
  )
}