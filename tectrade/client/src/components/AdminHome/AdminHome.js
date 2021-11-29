import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Helper/Context";
import Axios from "axios";

function AdminHome() {
    const { user, setUser } = useContext(UserContext);
    const [pendingTickets, setPendingTickets] = useState(
        user.tickets.filter((ticket) => ticket.Status === false)
    );

    function resolveTicket(ticket) {
        Axios.get(`http://localhost:3001/resolveTicket/${ticket.TicketId}`).then(
            (res, err) => {
                if (err) {
                    console.log(err);
                } else if (res.data.messageSuccess) {
                    window.location.reload(false);
                }
            }
        );
    }

    return (
        <div className="container col" style={{ marginTop: "3%" }}>
            <h1 className="container row justify-content-center">
                Bienvenido {user.firstName}
            </h1>
            <h1 className="subtitle">Tickets</h1>
            <div className="container row justify-content-center">
                {pendingTickets.length ? (
                    <div className="row justify-content-center">
                        {pendingTickets.map((pend) => (
                            <div
                                key={pend.TicketId}
                                className="card m-3"
                                style={{ width: "23rem" }}
                            >
                                <div className="card-body" key={pend.TicketId}>
                                    <h4>{pend.Title}</h4>
                                    <h5>{pend.Department}</h5>
                                    <p className="card-text">{pend.Description}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => resolveTicket(pend)}
                                    >
                                        Resolver
                  </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                        <h1>{user.firstName} por lo pronto no hay Tickets por resolver</h1>
                    )}
            </div>
        </div>
    );
}

export default AdminHome;
