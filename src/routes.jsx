import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./Components/Components-Login/PrivateRoute"

import Signup from "./Components/Components-Login/Signup"
import Login from "./Components/Components-Login/Login"
import ForgotPassword from "./Components/Components-Login/ForgotPassword"
import AuthForm from './Components/AuthForm/AuthForm';
import CadastrarBebida from './Components/CadastrarBebida/CadastrarBebida';
import CadastrarLanche from './Components/CadastrarLanche/CadastrarLanche';
import CadastrarProdutos from './Components/CadastroProdutos/CadastroProdutos';
import ClubeDesconto from './Components/ClubeDesconto/ClubeDesconto';
import Home from './Components/Home/Home';
import MontarPedido from './Components/MontarPedido/MontarPedido';
import PedidosAndamento from './Components/PedidosAndamento/PedidosAndamento';
import RealizarPedido from './Components/RealizarPedido/RealizarPedido';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={AuthForm} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/cadastrar-produtos" component={CadastrarProdutos} />
            <PrivateRoute exact path="/cadastrar-lanche" component={CadastrarLanche} />
            <PrivateRoute exact path="/cadastrar-bebida" component={CadastrarBebida} />
            <PrivateRoute exact path="/realizar-pedido" component={RealizarPedido} />
            <PrivateRoute exact path="/pedidos-andamento" component={PedidosAndamento} />
            <PrivateRoute exact path="/clube-desconto" component={ClubeDesconto} />
            <PrivateRoute exact path="/montar-pedido" component={MontarPedido} />
        </Switch>
    </BrowserRouter>
);

export default Routes;