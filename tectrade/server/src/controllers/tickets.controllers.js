import { getConnection,queries } from "../database";

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