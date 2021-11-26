import React, { useContext } from 'react'
import { UserContext } from '../../Helper/Context'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import './EmployeeHome.css'


function EmployeeHome() {
    const { user } = useContext(UserContext);


    const pendingTickets = user.tickets.filter(ticket => ticket.Status === false);
    const resolvedTickets = user.tickets.filter(ticket => ticket.Status === true);

    function deleteClick(ticket) {
        Axios.delete(`http://localhost:3001/deleteTicket/${ticket.TicketId}`)
            .then((res) => {
                window.location.reload(false);
            }).catch(err => {
                console.log(err);
            })
        // console.log(ticket.TicketId);
    }

    return (
        <div>
            <div className="home">
                <h1 className="title">Tickets {user.firstName}</h1>
                {user.tickets.length ?
                    <div className="row">
                        <h1 className="title">Tickets pendientes</h1>
                        <div className="ticketRow">
                            {
                                pendingTickets.map(filter => (
                                    <div key={filter.TicketId} className="card m-3 pending" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src="..." alt="" />
                                        <div className="card-body">
                                            <Link to={`tickets/${filter.TicketId}`}><h5 className="card-title">{filter.Title}</h5></Link>
                                            <p className="card-text">{filter.Description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <h1 className="title">Tickets resueltos</h1>
                        <div className="ticketRow">
                            {
                                resolvedTickets.map(filter => (
                                    <div key={filter.TicketId} className="card m-3 resolved" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src="..." alt="Card image cap" />
                                        <div className="card-body">
                                            <Link to={`tickets/${filter.TicketId}`}><h5 className="card-title">{filter.Title}</h5></Link>
                                            <p className="card-text">{filter.Description}</p>
                                            <a href="#" className="btn btn-danger" onClick={() => deleteClick(filter)}>Delete</a>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    : <h1>No hay tickets</h1>}
            </div>
        </div>
    )
}

export default EmployeeHome
