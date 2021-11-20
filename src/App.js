
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./Components/Components-Login/Signup";
import Login from "./Components/Components-Login/Login";
import PrivateRoute from "./Components/Components-Login/PrivateRoute";
import ForgotPassword from "./Components/Components-Login/ForgotPassword";
import UpdateProfile from "./Components/Components-Login/UpdateProfile";

import CadastrarBebida from './Components/CadastrarBebida/CadastrarBebida';
import CadastrarLanche from './Components/CadastrarLanche/CadastrarLanche';
import CadastrarProdutos from './Components/CadastroProdutos/CadastroProdutos';
import ClubeDesconto from './Components/ClubeDesconto/ClubeDesconto';
import Home from './Components/Home/Home';
import MontarPedido from './Components/MontarPedido/MontarPedido';
import PedidosAndamento from './Components/PedidosAndamento/PedidosAndamento';
import RealizarPedido from './Components/RealizarPedido/RealizarPedido';
import ItensPedido from "./Components/ItensPedido/ItensPedido";

function App() {
  return (
    
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/controle-usuarios" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/atualizar-perfil" component={UpdateProfile} />
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/cadastrar-produtos" component={CadastrarProdutos} />
              <PrivateRoute exact path="/cadastrar-lanche" component={CadastrarLanche} />
              <PrivateRoute exact path="/cadastrar-bebida" component={CadastrarBebida} />
              <PrivateRoute exact path="/realizar-pedido" component={RealizarPedido} />
              <PrivateRoute exact path="/pedidos-andamento" component={PedidosAndamento} />
              <PrivateRoute exact path="/itens-pedido" component={ItensPedido} />
              <PrivateRoute exact path="/clube-desconto" component={ClubeDesconto} />
              <PrivateRoute exact path="/montar-pedido" component={MontarPedido} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  )
};

export default App;