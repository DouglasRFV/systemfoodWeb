import './App.css';
import Header from './Components/HeaderHome/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
// import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Footer/>
      {/* <Login/> */}
    </div>
  );
}

export default App;
