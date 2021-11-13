import React,{useContext} from 'react'
import { UserContext } from '../../Helper/Context'

function AdminHome() {
    const {user} = useContext(UserContext);
    const pendingTickets = user.tickets.filter(ticket => ticket.Status == false);
    console.log(pendingTickets);
    return (
        <div>
            {pendingTickets.length ? 
            
            
                <div className="row">
                {pendingTickets.map(pend => (
                    <div className="col-3" key={pend.TicketId}>
                        <h1>{pend.Title}</h1>
                        <h1>{pend.Department}</h1>
                        <button>Resuelto</button>
                    </div>
                ))}
                
                </div> 
                : 
                <h1>{user.firstName} por lo pronto no hay Tickets por resolver</h1>}
            
        </div>
    )
}

export default AdminHome
