import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Helper/Context'
import Axios from 'axios'

function AdminHome() {

    const { user, setUser } = useContext(UserContext);
    const [pendingTickets, setPendingTickets] = useState(user.tickets.filter(ticket => ticket.Status === false));

    function resolveTicket(ticket) {
        Axios.get(`http://localhost:3001/resolveTicket/${ticket.TicketId}`)
            .then((res, err) => {
                if (err) {
                    console.log(err);
                }
                else if (res.data.messageSuccess) {
                    window.location.reload(false);
                }
            })
    }

    return (
        <div>
            <h1>Tickets</h1>
            {pendingTickets.length ?
                <div className="row">
                    {pendingTickets.map(pend => (
                        <div className="col-3" key={pend.TicketId}>
                            <h1>{pend.Title}</h1>
                            <h1>{pend.Department}</h1>
                            <button onClick={() => resolveTicket(pend)} >Resuelto</button>
                        </div>
                    ))}
                </div>
                :
                <h1>{user.firstName} por lo pronto no hay Tickets por resolver</h1>}

        </div>
    )
}

export default AdminHome
