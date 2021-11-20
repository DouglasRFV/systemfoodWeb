import './Header.css';
import React, { useState } from "react"
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom"


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [ setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory();
  const emailUser = localStorage.getItem('emailUser');

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            width="40"
            height="40"
            className="imgHeader"
            alt="Home" />
        </Navbar.Brand>
        <a href="/"><h3 className="mt-0 mb-0 fontConfig">SystemFood</h3></a>
        <Nav.Link title="Perfil" href="/atualizar-perfil"><h6 className="mt-3 text-info">{emailUser}</h6></Nav.Link>
        <Nav className="justify-content-end" style={{ width: "100%" }} onClick={() => handleLogout()}>
          <Nav.Link title="Sair" href="/login"><i className="fas fa-sign-out-alt fa-2x"></i></Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
<i class="fa-solid fa-arrow-right-from-bracket"></i>