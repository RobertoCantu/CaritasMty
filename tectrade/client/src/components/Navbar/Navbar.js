import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Helper/Context';
import Axios from 'axios';


const NavBar = ({isAuth}) => {
  //UseContext api
  const {user,setUser} = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  //This function changes the object User and set loggedIn attribute to false
  //and also elimantes the user cookie from local storage
  const logOut = (e) => {
    sessionStorage.removeItem('UserId'); 
    Axios.get('http://localhost:3001/logout')
    .then((res) =>{
      setUser({id: "",
      email: "",
      firstName: "",
      lastName: "",
      loggedIn: false,
      isAdmin: null,
      tickets: [],});
    }).catch(err => console.log(err));
    
  }
 
    return (
      <div>
        {isAuth && !user.isAdmin ? <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Caritas</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Ticket</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tickets">My Tickets</Link>
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
                <Link onClick= {logOut} className="nav-link" to="">Log out</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav> : <div>{isAuth && user.isAdmin ? <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Caritas</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
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
                <Link onClick= {logOut} className="nav-link" to="">Log out</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      : 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Caritas</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>} </div>
      
      
      
      }
      </div>
    );
}

export default NavBar;