
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
import EmployeeHome from './components/EmployeeHome/EmployeeHome';


function App() {
 
  const [user,setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
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
          const userInfo = res.data.user;
          const tickets = res.data.tickets;
        
            setUser({
              ...user,
              id: userInfo[0].UserId,
              email: userInfo[0].Email,
              firstName: userInfo[0].FirstName,
              lastName: userInfo[0].LastName,
              tickets: tickets,
              loggedIn:true});
              
        } else {
          setUser({loggedIn:false});
          
        }
    }).catch(err => {
      console.log(err);
    })
}, []);

// if (user.id){
 
//     Axios.get(`http://localhost:3001/${user.id}/tickets`).
//       then((res) => {
//         setUser({ ...user, tickets: res.data });
//       }).catch(error => {
//         console.log(error);
//       })
 
// }






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
        <UserContext.Provider value={{user}}>
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
        
        <UserContext.Provider value={{user}}>
        <EmployeeHome></EmployeeHome>
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
