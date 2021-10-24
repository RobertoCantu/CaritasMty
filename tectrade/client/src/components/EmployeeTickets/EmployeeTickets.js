import React, {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../../Helper/Context';

function EmployeeTickets() {
    const [tickets,setTickets] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/${user.email}/tickets`).
        then((res) => {
            setTickets(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    //console.log(user.email);
    
    return (
        <div >
            <h1>My tickets</h1>
            <div className="container row">
            {tickets.map(ticket => (
                <div className="card m-3"  style={{width: '18rem'}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title">{ticket.name}</h5>
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
