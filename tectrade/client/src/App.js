
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import NavBar from './components/Navbar/Navbar.js';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/Login/Login';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import EmpRoute from './Routes/EmpRoute';
import {UserContext} from './Helper/Context';
import TicketForm from './components/TicketForm/TicketForm';
import EmployeeTickets from './components/EmployeeTickets/EmployeeTickets';
import TicketDetails from './components/TicketDetails/TicketDetails';
import HomeWrapper from './components/HomeWrapper/HomeWrapper';


function App() {
 
  const [user,setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    loggedIn: null,
    isAdmin: null,
    tickets: [],
  });
  //let history = useHistory();
  Axios.defaults.withCredentials = true;

  
//Obtain user information
  useEffect(() => {
    Axios.get("http://localhost:3001/login").
    then(res => {
      //console.log(res.data);
      
        if(res.data.loggedIn == true){
          const userInfo = res.data.user;
          const tickets = res.data.tickets;
          const isAdmin = res.data.isAdmin;
          
        
            setUser({         
              id: userInfo[0].UserId,
              email: userInfo[0].Email,
              firstName: userInfo[0].FirstName,
              lastName: userInfo[0].LastName,
              tickets: tickets,
              isAdmin:isAdmin,
              loggedIn:true});
              
        } else {
          setUser({loggedIn:false});
          
        }
    }).catch(err => {
      //console.log(err);
    })
}, []);


  if(user.loggedIn === null){
    return (
      <div>Loading Page...</div>
    )
  } else {
  return (
    <div>
    <Router>
    <UserContext.Provider value={{user,setUser}}>
    <NavBar isAuth = {user.loggedIn}/> 
    </UserContext.Provider>
      <Switch>
      
      <PublicRoute
      exact path = "/login"
      isAuth = {user.loggedIn}
      >
        <UserContext.Provider value={{user,setUser}}>
        <Login/>
        </UserContext.Provider>
      </PublicRoute>

      
      <EmpRoute 
        exact path="/create" 
        isAuth={user.loggedIn}
        isAdmin={user.isAdmin}
        >
        <UserContext.Provider value={{user}}>
          <TicketForm/>
          </UserContext.Provider>
        </EmpRoute>

        <EmpRoute 
        exact path="/tickets" 
        isAuth={user.loggedIn}
        isAdmin={user.isAdmin}
        >
          
        <UserContext.Provider value={{user,setUser}}>
          <EmployeeTickets/>
          </UserContext.Provider>
        </EmpRoute>

        <PrivateRoute 
        exact path="/tickets/:id" 
        isAuth={user.loggedIn}
        >
          
        <UserContext.Provider value={{user}}>
          <TicketDetails/>
          </UserContext.Provider>
        </PrivateRoute>


      <PrivateRoute
      exact path = "/"
      isAuth = {user.loggedIn}
      >
        
        <UserContext.Provider value={{user}}>
        <HomeWrapper/>
        </UserContext.Provider>
        </PrivateRoute>

        <PrivateRoute
        exact path = "*"
        isAuth = {user.loggedIn}
        >
          <PageNotFound/>
        
        </PrivateRoute>
      
      </Switch>
    </Router>
    </div>    
  );
}
}

export default App;
