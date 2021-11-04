import './Header.css';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { auth } from "../../firebase";


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    console.log('PROPS =>', props);

    const myFunction = () => {
       // inserir logout firebase
       auth().signOut();
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
                        alt="Home"/>
                </Navbar.Brand>
                <Nav className="justify-content-end" style={{ width: "100%" }} onClick={ () => myFunction() }>
                    <Nav.Link href="/login"><RiLogoutBoxRLine color="#f8f8f8" size={30}/></Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}