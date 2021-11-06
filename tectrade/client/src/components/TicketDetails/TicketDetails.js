import React, { useContext,useState,useEffect } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../Helper/Context';


function TicketDetails() {
    const {tickets} = useContext(UserContext);
    const {id} = useParams();
    const [result,setResult] = useState([]);
    console.log(tickets);
   //setResult(tickets.filter(ticket => ticket.id == id));
    console.log(result);

    useEffect(()=>{
        setResult(tickets.filter(ticket => ticket.id === id));

    },[tickets])
    
  
   
    return (
        <div>
            {result.length ? <h1>{result[0].name}</h1>: <h1>No existe producto con el id: {id}</h1>}
        </div>
    )
}

export default TicketDetails
