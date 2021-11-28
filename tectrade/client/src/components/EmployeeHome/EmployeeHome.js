import React, { useContext, useState } from "react";
import { UserContext } from "../../Helper/Context";
import { Link } from "react-router-dom";
import Axios from "axios";

function EmployeeHome() {
  const { user, setUser } = useContext(UserContext);
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
      <div className="home" style={{ marginTop: "3%" }}>
        <h1 className="container row justify-content-center">
          Bienvenido {user.firstName}
        </h1>
        {user.tickets.length ? (
          <div className="row justify-content-center">
            <h1 style={{ marginTop: "2%" }}>Tickets Pendientes</h1>
            {pendingTickets.map((pend) => (
              <div
                key={pend.TicketId}
                className="card m-3"
                style={{ width: "23rem" }}
              >
                <div className="card-body" key={pend.TicketId}>
                  <Link to={`tickets/${pend.TicketId}`}>
                    <h4>{pend.Title}</h4>
                  </Link>
                  <h5>{pend.Department}</h5>
                  <p>{pend.Description}</p>
                </div>
              </div>
            ))}
            <h1 style={{ marginTop: "2%" }}>Tickets Resueltos</h1>
            {resolvedTickets.map((pend) => (
              <div
                key={pend.TicketId}
                className="card m-3"
                style={{ width: "23rem" }}
              >
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                  <Link to={`tickets/${pend.TicketId}`}>
                    <h5 className="card-title">{pend.Title}</h5>
                  </Link>
                  <p>{pend.Description}</p>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={() => deleteClick(pend)}
                  >
                    Borrar
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
