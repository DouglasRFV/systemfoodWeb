import './Header.css';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { RiLogoutBoxRLine } from "react-icons/ri";


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    console.log('PROPS =>', props);

    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="#home">
                    <img
                        src="/logo.png"
                        width="40"
                        height="40"
                        className="imgHeader"
                        alt="Home"/>
                </Navbar.Brand>
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link href="#logout"><RiLogoutBoxRLine color="#f8f8f8" size={30}/></Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}