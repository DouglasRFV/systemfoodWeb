import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthForm from './Components/AuthForm/AuthForm';
import CadastrarLanche from './Components/CadastrarLanche/CadastrarLanche';
import ClubeDesconto from './Components/ClubeDesconto/ClubeDesconto';
import Home from './Components/Home/Home';
import PedidosAndamento from './Components/PedidosAndamento/PedidosAndamento';
import RealizarPedido from './Components/RealizarPedido/RealizarPedido';

// const uid = localStorage.getItem("uid");
// const PrivateRoute = ({ component: Component, ...rest }) => {

//     console.log('UID =>', uid);
//     console.log('COMPONENT =>', Component);
//     console.log('REST =>', rest);
    
//     <Route 
//     {...rest} 
//     render={props =>
//             uid ? (
//                 <Component {...props} />
//             ) : (
//                 <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
//             )
//         }
//     />
// }

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={AuthForm} />
            {/* <PrivateRoute exact path="/" component={(props) => <Home {...props} />} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/cadastrar-lanche" component={CadastrarLanche} />
            <Route exact path="/realizar-pedido" component={RealizarPedido} />
            <Route exact path="/pedidos-andamento" component={PedidosAndamento} />
            <Route exact path="/clube-desconto" component={ClubeDesconto} />
        </Switch>
    </BrowserRouter>
);

export default Routes;