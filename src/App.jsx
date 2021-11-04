import AuthForm from './Components/AuthForm/AuthForm';
import Home from './Components/Home/Home'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={AuthForm}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
