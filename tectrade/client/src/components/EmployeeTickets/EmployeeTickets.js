import React, { useEffect, useContext } from 'react'
import Axios from 'axios'
import { UserContext } from '../../Helper/Context';
import { Link } from 'react-router-dom';


function EmployeeTickets() {
  //Context api
  const { user, setUser } = useContext(UserContext);

  //Obtain tickets information
  // useEffect(() => {
  //   Axios.get(`http://localhost:3001/${user.id}/tickets`).
  //     then((res) => {
  //       setUser({ ...user, tickets: res.data });
  //     }).catch(error => {
  //       console.log(error);
  //     })
  // }, []);

  console.log(user);

  function deleteClick(ticket) {
    Axios.delete(`http://localhost:3001/deleteTicket/${ticket.TicketId}`)
      .then((res) => {
        console.log(res.data.messageSuccess);
        Axios.get(`http://localhost:3001/${user.id}/tickets`).
          then((res) => {
            setUser({ ...user, tickets: res.data });
          }).catch(error => {
            console.log(error);
          })

      }).catch(err => {
        console.log(err);
      })
    // console.log(ticket.TicketId);
  }

  function editClick(ticket) {
    console.log(ticket);
  }



  return (
    <div >
      <h1>My tickets</h1>
      <div className="container row">
        {user.tickets.length ? user.tickets.map(ticket => (
          <div key={ticket.TicketId} className="card m-3" style={{ width: '18rem' }}>
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <Link to={`tickets/${ticket.TicketId}`}><h5 className="card-title">{ticket.Title}</h5></Link>
              <p className="card-text">{ticket.Description}</p>
              <a href="#" className="btn btn-info" onClick={() => editClick(ticket)}>Edit</a>
              <a href="#" className="btn btn-danger" onClick={() => deleteClick(ticket)}>Delete</a>
            </div>
          </div>
        ))
          :
          <div>
            <h1>Hey {user.firstName} you haven't create any Ticket</h1>
            <h2>If you have a problem please create a Ticket on this button</h2>
            <Link to={'/create'}><button type="button" className="btn btn-success">Ticket</button></Link>
          </div>
        }
      </div>

    </div>
  )
}

export default EmployeeTickets
