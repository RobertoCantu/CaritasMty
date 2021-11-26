import React, { useContext } from "react";
import { UserContext } from "../../Helper/Context";
import { Link } from "react-router-dom";
import Axios from "axios";

function EmployeeHome() {
  const { user } = useContext(UserContext);

  const pendingTickets = user.tickets.filter(
    (ticket) => ticket.Status === false
  );
  const resolvedTickets = user.tickets.filter(
    (ticket) => ticket.Status === true
  );

  function deleteClick(ticket) {
    Axios.delete(`http://localhost:3001/deleteTicket/${ticket.TicketId}`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(ticket.TicketId);
  }

  return (
    <div className="container col">
      <div className="home">
        <h1 className="container row justify-content-center">
          Bienvenido {user.firstName}
        </h1>
        {user.tickets.length ? (
          <div className="row justify-content-center">
            <h1>Pending Tickets</h1>
            {pendingTickets.map((filter) => (
              <div
                key={filter.TicketId}
                className="card m-3"
                style={{ width: "18rem" }}
              >
                <img className="card-img-top" src="..." alt="" />
                <div className="card-body">
                  <Link to={`tickets/${filter.TicketId}`}>
                    <h5 className="card-title">{filter.Title}</h5>
                  </Link>
                  <p className="card-text">{filter.Description}</p>
                </div>
              </div>
            ))}
            <h1>Resolved Tickets</h1>
            {resolvedTickets.map((filter) => (
              <div
                key={filter.TicketId}
                className="card m-3"
                style={{ width: "18rem" }}
              >
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                  <Link to={`tickets/${filter.TicketId}`}>
                    <h5 className="card-title">{filter.Title}</h5>
                  </Link>
                  <p className="card-text">{filter.Description}</p>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={() => deleteClick(filter)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="container row justify-content-center">
            No hay tickets
          </h1>
        )}
      </div>
    </div>
  );
}

export default EmployeeHome;
