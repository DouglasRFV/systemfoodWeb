import './Header.css';
import React, { useState } from "react"
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom"
import { i18n } from '../../translate/i18n';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory();
  const emailUser = localStorage.getItem('emailUser');

  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);
  const I18N_STORAGE_KEY = 'i18nextLng';
  const [language] = useState(localStorage.getItem(I18N_STORAGE_KEY));

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const handleDropdownChange = (event) => {
    console.log(event.target.value);
    localStorage.setItem(
      I18N_STORAGE_KEY,
      event.target.value
    );
    window.location = window.location;
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

        <Nav className="justify-content-end" style={{ width: "100%", marginRight: "20px" }} onClick={() => handleLogout()}>
          <Nav.Link title={i18n.t('titles.sair')} href="/login"><i className="fas fa-sign-out-alt fa-2x"></i></Nav.Link>
        </Nav>
        <select title={i18n.t('titles.idioma')} className="form-select" value={language} onChange={(event) => handleDropdownChange(event)} style={{ width: "15%", marginRight: "20px" }}>
          <option value="pt-BR">PT</option>
          <option value="en-US">EN</option>
        </select>
      </Navbar>
    </div>
  );
}
<i className="fa-solid fa-arrow-right-from-bracket"></i>