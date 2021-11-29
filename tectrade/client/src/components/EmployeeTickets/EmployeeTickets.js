import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../Helper/Context";
import { Link } from "react-router-dom";
import TicketEdit from "../TicketEdit/TicketEdit";
import "./EmployeeTickets.css"

function EmployeeTickets() {
  //Context api
  const { user, setUser } = useContext(UserContext);

  //Obtain tickets information
  useEffect(() => {
    Axios.get(`http://localhost:3001/${user.id}/tickets`)
      .then((res) => {
        setUser({ ...user, tickets: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deleteClick(ticket) {
    Axios.delete(`http://localhost:3001/deleteTicket/${ticket.TicketId}`)
      .then((res) => {
        console.log(res.data.messageSuccess);
        Axios.get(`http://localhost:3001/${user.id}/tickets`)
          .then((res) => {
            setUser({ ...user, tickets: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(ticket.TicketId);
  }

  const [editing, setEditing] = useState(false);
  const [ticketClicked, setTicketClicked] = useState(null);

  function editClick(ticket) {
    setTicketClicked(ticket);
    changeEditing();
  }

  function changeEditing() {
    setEditing(!editing);
  }

  return (
    <div className="container col">
      <h1
        className="container row justify-content-center"
        style={{ marginTop: "3%" }}
      >
        Mis Tickets
      </h1>
      <div className="container row justify-content-center">
        {user.tickets.length ? (
          user.tickets.map((ticket) => (
            <div
              key={ticket.TicketId}
              className={"card m-3 " + (ticket.Status ? 'solved' : 'pending')}
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <Link className="link" to={`tickets/${ticket.TicketId}`}>
                  <h4 className="card-title">{ticket.Title}</h4>
                </Link>
              </div>
              <div className="card-body">
                <p className="card-text">{ticket.Description}</p>
                <div>
                  {!ticket.Status &&
                    <a
                      href="#"
                      className="btn btn-info"
                      onClick={() => editClick(ticket)}
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                  </a>
                  }
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={() => deleteClick(ticket)}
                  >
                    Borrar
                </a>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div className="container col">
              <h1>Hey {user.firstName} no has creado ningún Ticket</h1>
              <h2>
                Si tienes algun problema, puedes crear un nuevo Ticket con el
                botón de abajo
            </h2>
              <Link to={"/create"}>
                <button type="button" className="btn primary">
                  Ticket
              </button>
              </Link>
            </div>
          )}
      </div>

      {editing && (
        <TicketEdit
          ticket={ticketClicked}
          changeEdit={(editing) => setEditing(editing)}
        />
      )}
    </div>
  );
}

export default EmployeeTickets;
