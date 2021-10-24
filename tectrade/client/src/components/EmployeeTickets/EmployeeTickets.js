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
        <div>
            <h1>My tickets</h1>
            {tickets.map(ticket => (
                <div key={ticket.id}>
                    <h2>{ticket.name}</h2>
                    <h2>{ticket.department}</h2>
                    <h2>{ticket.description}</h2>
                    <h2>{ticket.date}</h2>
                </div>
            ))}
            
        </div>
    )
}

export default EmployeeTickets
