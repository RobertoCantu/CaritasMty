import { getConnection, queries } from "../database";
import { sql } from "../database";

//Route for sending tickets based on employee username to the front end
export const getAllUserTickets = async (req, res) => {

  const usernameId = req.params.usernameId;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("UsernameId", usernameId)
      .query(queries.getAllUserTickets);
    if (result.recordset.length > 0) {
      res.send(result.recordset);
    } else {
      res.send(result.recordset);
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }


};

export const getAllTickets = async (req, res) => {

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.getAllTickets);
    if (result.recordset.length > 0) {
      res.send(result.recordset);
    } else {
      res.send(result.recordset);
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }


};

//Route for creating Ticket
export const createTicket = async (req, res) => {
  //console.log(req.body);
  const { ticketTitle, ticketDepartment, ticketDescription, ticketDate, ticketUserId } = req.body;
  if (ticketTitle == '' || ticketDepartment == '' || ticketDescription == '' || ticketDate == '') {
    res.send({ messageError: "Por favor llena todo los campos" });

  } else {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("TicketTitle", sql.VarChar, ticketTitle)
        .input("TicketDepartment", sql.VarChar, ticketDepartment)
        .input("TicketDescription", sql.VarChar, ticketDescription)
        .input("TicketDate", sql.Date, ticketDate)
        .input("TicketStatus", sql.Bit, 0)
        .input("TicketUserId", sql.Int, ticketUserId)
        .query(queries.createTicket);

      if (result) {
        res.send({ messageSuccess: "Ticket creado" });
      }
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  }

}

// Route for deleting ticket
export const deleteTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("TicketId", ticketId)
      .query(queries.deleteTicket);
    console.log(result);
    if (result.rowsAffected.length > 0) {
      res.send({ messageSuccess: "Ticket borrado" });
    } else {
      res.send({ messageSuccess: "Ticket no borrado" });
    }
  } catch (e) {
    res.status(500);
    res.send(error.message);
  }

  // console.log(ticketId)
};

// Route for editing ticket
export const editTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const { ticketTitle, ticketDepartment, ticketDescription, ticketDate } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("TicketTitle", sql.VarChar, ticketTitle)
      .input("TicketDepartment", sql.VarChar, ticketDepartment)
      .input("TicketDescription", sql.VarChar, ticketDescription)
      .input("TicketDate", sql.Date, ticketDate)
      .input("TicketId", ticketId)
      .query(queries.editTicket);

    if (result) {
      res.send({ messageSuccess: "Ticket editado" });
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

export const resolveTicket = async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("TicketId", ticketId)
      .query(queries.resolveTicket);

    if (result) {
      res.send({ messageSuccess: "Ticket resuelto" });
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};