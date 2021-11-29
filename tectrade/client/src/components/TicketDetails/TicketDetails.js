import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../Helper/Context";

function TicketDetails() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [result, setResult] = useState([]);

  //This hook obtains a ticked based on url id
  useEffect(() => {
    setResult(
      user.tickets.filter((ticket) => ticket.TicketId === parseInt(id))
    );
  }, [user, id]);

  return (
    <div className="container col" style={{ marginTop: "5%" }}>
      {result.length ? (
        <div className="container row justify-content-center">
          <div className="card m-3" style={{ width: "40rem" }}>
            <h1 className="card-text" style={{ margin: "40px 30px 40px 30px" }}>
              {result[0].Title}
            </h1>
            <h4 className="card-text" style={{ margin: "10px 30px 10px 30px" }}>
              {result[0].Department}
            </h4>
            <h5 className="card-text" style={{ margin: "10px 30px 40px 30px" }}>
              {result[0].Description}
            </h5>
          </div>
        </div>
      ) : (
        <h1
          className="container row justify-content-center"
          style={{ marginTop: "5%" }}
        >
          Lo sentimos {user.firstName}, no existe Ticket con el id: {id}
        </h1>
      )}
    </div>
  );
}

export default TicketDetails;
