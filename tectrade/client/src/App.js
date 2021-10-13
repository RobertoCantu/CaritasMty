
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import NavBar from './components/Navbar/Navbar.js';
import Users from './components/users/users';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import BlogDetails from './components/BlogDetails/BlogDetails';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Axios from 'axios';
import {useState, useEffect,Suspense} from 'react';
import {useHistory} from 'react-router-dom';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import {UserContext} from './Helper/Context';


function App() {
  const [userInfo,SetuserInfo] = useState({});
  const [loggedIn,setLoggedIn] = useState(false);
  let history = useHistory();
  Axios.defaults.withCredentials = true;

  

  useEffect(() => {
    Axios.get("http://localhost:3001/login").
    then(res => {
      console.log(res.data);
      console.log("perro");
        if(res.data.loggedIn == true){
            setLoggedIn(true);
            console.log(loggedIn);
        }
    })
}, [])

console.log(loggedIn);
  

  // useEffect(() => {
  //   if(testo == false){
  //     history.push('/login');
  //   }
  //   console.log("hola");

  // }, []);

  // if(testo == false){
  //   history.push('/login');
  // }

  // const login = () => Axios.get('http://localhost:3001/login').
  // then(res => {
  //   console.log("hola");
  // })
  
  return (
    //{loggedIn ? <h1>Yeii </h1> : <h2>xd</h2>  }
    <div>
    <NavBar isAuth = {loggedIn}> 

    </NavBar>
 
    <Router>
      <Switch>
      
      <PublicRoute
       path = "/login" exact
      isAuth = {loggedIn}
      >
        <UserContext.Provider value={{setLoggedIn}}>
        <Login func = {loggedIn => setLoggedIn(loggedIn)}/>
        </UserContext.Provider>
      </PublicRoute>
     
      
      <PrivateRoute
      path = "/" exact
      isAuth = {loggedIn}
      >
        
        <UserContext.Provider value={{setLoggedIn}}>
        <Home/>
        </UserContext.Provider>
        </PrivateRoute>
      

      <Route path="*" exact component={PageNotFound} />
      </Switch>

    


    </Router>
    </div>

















  //  <div>
  //    {loggedIn ? 
  //    <Router> 
  //     <NavBar login = {loggedIn}  /> 
  //       <Switch>
  //         <Route path="/" exact>
  //           <Home/>
  //           <Users/>
  //         </Route>
          
  //         <Route path="/Blogs" exact >
           
  //         </Route>
  //         <Route path="/Blogs/:id" exact >
  //           <BlogDetails/>
  //         </Route>
  //         <Route path="*" exact component={PageNotFound} />
          
  //       </Switch>
        


  //     </Router>: 
  //   <Router>
      
  //     <NavBar login = {loggedIn}/>
  //     <Switch>
  //           <Route path="/login" exact>
  //           <Login func = {loggedIn => setLoggedIn(loggedIn)}/>
  //           </Route>
          
  //         <Route path="*" exact component={PageNotFound} />
  //         </Switch>
      
  //     </Router>
      
  //     }
    
      
  //     </div>
      
      



    
  );
}

export default App;
