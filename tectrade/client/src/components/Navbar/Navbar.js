import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import logo from '../../img/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';


const NavBar = ({login}) => {
 
    return (
      <div>
        {login ? <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Caritas</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Resources">Resources</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AboutUs">About us</Link>
              </li>
              
              
            </ul>
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Account">My Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Help">Help</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Logout">Log out</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav> : 
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Caritas</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <Link className="nav-link" to="/Logout">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Logout">Login</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      
      }
      </div>

        

    );
}

export default NavBar;