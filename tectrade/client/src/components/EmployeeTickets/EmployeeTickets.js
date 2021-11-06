import React, {useEffect, useContext} from 'react'
import Axios from 'axios'
import { UserContext } from '../../Helper/Context';
import { Link } from 'react-router-dom';


function EmployeeTickets() {
  //Context api
  const {user,setUser} = useContext(UserContext);

  //Obtain tickets information
  useEffect(() => {
  Axios.get(`http://localhost:3001/${user.id}/tickets`).
  then((res) => {
    setUser({...user,tickets:res.data});
  }).catch(error => {
      console.log(error);
  })
  }, []);

   
 
    return (
        <div >
            <h1>My tickets</h1>
            <div className="container row">
            {user.tickets.map(ticket => (
                <div key={ticket.id} className="card m-3"  style={{width: '18rem'}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                  <Link to={`tickets/${ticket.id}`}><h5 className="card-title">{ticket.name}</h5></Link>
                  <p className="card-text">{ticket.description}</p>
                  <a href="#" className="btn btn-info">Edit</a>
                  <a href="#" className="btn btn-danger">Delete</a>
                </div>
              </div>
            ))}
            </div>
            
        </div>
    )
}

export default EmployeeTickets
