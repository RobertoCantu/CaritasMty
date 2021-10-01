
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import NavBar from './components/Navbar/Navbar.js';
import Users from './components/users/users';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Blogs from './components/Blogs/Blogs';
import {useState} from 'react'

function App() {
  const [blogs,setBlogs] = useState([{
    title:"Css problems",
    author:"Danny Trejo",
    texto: "bla bla bla",

}, {
    title:"Javascript callback problems",
    author: "Osama Bin Laden",
    texto: "bla bla bla"
}])
  return (
    
      <Router> 
      <NavBar />
     
      
        <Switch>
          <Route path="/" exact>
            <Users/>
          </Route>
          <Route path="/Blogs" exact >
            <Blogs blogs={blogs}/>
          </Route>
          <Route path="/Blogs/:id" exact >
            <div>hola</div>
          </Route>
          <Route path="*" exact component={PageNotFound} />
          
        </Switch>
        


      </Router>
      
      



    
  );
}

export default App;
