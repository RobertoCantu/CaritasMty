import { getConnection,queries } from "../database";
import { sql } from "../database";

//Route for sending tickets based on employee username to the front end
 export const getAllUserTickets = async (req,res) => {
    
    const usernameId = req.params.usernameId;
    try{
        const pool =  await getConnection();
        const result= await pool
        .request()
        .input("UsernameId", usernameId)
        .query(queries.getAllUserTickets);
        if(result.recordset.length > 0){
            res.send(result.recordset);
        } else {
            res.send(result.recordset);
        }
    } catch(e){
        res.status(500);
        res.send(error.message);
    }
};

//Route for creating Ticket
export const createTicket = async(req,res) => {
    //console.log(req.body);
    const {ticketTitle,ticketDepartment,ticketDescription,ticketDate,ticketUserId} = req.body;
    if(ticketTitle == null || ticketDepartment == null || ticketDescription == null || ticketDate == null){
        res.send({message:"Por favor llena todo los campos"});
    } else {
        try{
                const pool =  await getConnection();
                const result= await pool
                .request()
                .input("TicketTitle",sql.VarChar, ticketTitle)
                .input("TicketDepartment",sql.VarChar,ticketDepartment)
                .input("TicketDescription",sql.VarChar,ticketDescription)
                .input("TicketDate",sql.Date,ticketDate)
                .input("TicketStatus",sql.Bit,0)
                .input("TicketUserId",sql.Int,ticketUserId)
                .query(queries.createTicket);
                
                console.log(result);
            } catch(e){
                res.status(500);
                res.send(error.message);
            }
    }
    
}


//Falta ruta para eliminar ticket por id


//Falta ruta para hacer update en un ticket por id