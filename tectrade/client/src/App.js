
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import NavBar from './components/Navbar/Navbar.js';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import {UserContext} from './Helper/Context';
import TicketForm from './components/TicketForm/TicketForm';
import EmployeeTickets from './components/EmployeeTickets/EmployeeTickets';
import TicketDetails from './components/TicketDetails/TicketDetails';


function App() {
 
  const [user,setUser] = useState({
    id: "1",
    email: "test@test",
    loggedIn: null,
    tickets: [],
  });
  let history = useHistory();
  Axios.defaults.withCredentials = true;

  
//Obtain user information
  useEffect(() => {
    Axios.get("http://localhost:3001/login").
    then(res => {
      console.log(res.data);
        if(res.data.loggedIn == true){
            setUser({...user, loggedIn:true});
        } else {
          setUser({...user, loggedIn:false});
        }
    }).catch(err => {
      console.log(err);
    })
}, [])



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

      
      <PrivateRoute 
        exact path="/create" 
        isAuth={user.loggedIn}
        >
        <UserContext.Provider value={{}}>
          <TicketForm/>
          </UserContext.Provider>
        </PrivateRoute>

        <PrivateRoute 
        exact path="/tickets" 
        isAuth={user.loggedIn}
        >
          
        <UserContext.Provider value={{user,setUser}}>
          <EmployeeTickets/>
          </UserContext.Provider>
        </PrivateRoute>

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
        
        <UserContext.Provider value={{}}>
        <Home/>
        </UserContext.Provider>
        </PrivateRoute>
      <Route path="*" exact component={PageNotFound} />
      </Switch>
    </Router>
    </div>    
  );
}
}

export default App;
