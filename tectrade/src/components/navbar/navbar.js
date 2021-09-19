import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../../img/logo.png';
import './navbar.css';


const NavBar = () => {
    return (

        <Navbar bg="light" expand="lg">
            <img src={logo} width="100" height="60" className="d-inline-block align-top" alt="" />

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="">
                <Nav className="justify-content-end" >
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Library</Nav.Link>
                    <Nav.Link href="#link">Donate</Nav.Link>
                    <Nav.Link href="#link">About us</Nav.Link>

                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="justify-content-end" >
                    <Nav.Link href="#home">Perfil</Nav.Link>
                    <Nav.Link href="#link">Log out</Nav.Link>

                </Nav>
            </Navbar.Collapse>

        </Navbar>

    );
}

export default NavBar;