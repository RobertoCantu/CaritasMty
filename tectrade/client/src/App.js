
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

function App() {
  
  return (
    
      <Router> 
      <NavBar />
     
      
        <Switch>
          <Route path="/" exact>
            <Home/>
            <Users/>
          </Route>
          <Route path="/Blogs" exact >
           
          </Route>
          <Route path="/Blogs/:id" exact >
            <BlogDetails/>
          </Route>
          <Route path="*" exact component={PageNotFound} />
          
        </Switch>
        


      </Router>
      
      



    
  );
}

export default App;
