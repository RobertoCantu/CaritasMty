import React, { useContext,useState,useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../Helper/Context';


function TicketDetails() {
    const {user} = useContext(UserContext);
    const {id} = useParams();
    const [result,setResult] = useState([]);
    
    
    //This hook obtains a ticked based on url id 
    useEffect(()=>{
        setResult(user.tickets.filter(ticket => ticket.TicketId === parseInt(id)));
    },[user,id])

    return (
        <div>
            {result.length ? <h1>{result[0].Title}</h1>: <h1>Lo sentimos {user.firstName}, no existe Ticket con el id: {id}</h1>}
        </div>
    )
}

export default TicketDetails
