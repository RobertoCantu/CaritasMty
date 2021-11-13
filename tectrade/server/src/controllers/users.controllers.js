import { getConnection,queries } from "../database";

//Admin users
const admin = ["gerardo@caritas.com","sara@caritas.com"];

export const getLogin = async (req,res) =>{
    //const userId = await req.body
    //Verify if a session already exists
    //console.log(req.session);
    if(req.session.user){
        const usernameId = req.session.user[0].UserId;
        //console.log(usernameId);
        try {
            const pool = await getConnection();
            const result = await pool
              .request()
              .input("UsernameId", usernameId)
              .query(queries.getAllUserTickets);
              //console.log(result);
            if (result.recordset.length > 0) {
               // console.log(result.recordset);
                res.send({loggedIn:true, user: req.session.user, tickets: result.recordset, isAdmin: req.session.isAdmin});
            } else {
                res.send({loggedIn:true, user: req.session.user, tickets: [], isAdmin: req.session.isAdmin})
            }
          } catch (e) {
            res.status(500);
            res.send(e.message);
          }

        //console.log(req.session);
        
    } else{
        res.send({loggedIn:false});
    }

};


export const postLogin =async function(req, res) {
    
    
    const userEmail = await req.body.userEmail;
    const userPassword = await req.body.userPassword;
    //console.log(userPassword);
    try{
        const pool =  await getConnection();
        const result= await pool
        .request()
        .input("Email",userEmail)
        .input("Password",userPassword)
        .query(queries.getUser);
        
        
        // const tickets = await pool
        // .request()
        // .input("UsernameId", usernameId)
        // .query(queries.getAllUserTickets);

        if(result.recordset.length > 0){
            const usernameId = result.recordset[0].UserId;
            const userEmail = result.recordset[0].Email;
            
            //Check if user is admin
            if(admin.includes(userEmail)){
                console.log("Entro aqui")
                //Obtain Tickets
                const allTickets = await pool
                .request()
                .query(queries.getAllTickets);
                console.log(allTickets.recordset)
                req.session.user = allTickets.recordset;
                req.session.isAdmin = true;
                res.send({loggedIn:true, user: req.session.user, tickets: allTickets.recordset, isAdmin: req.session.isAdmin});
            } else {
                //Obtain Tickets
                const userTickets = await pool
                .request()
                .input("UsernameId", usernameId)
                .query(queries.getAllUserTickets);
                req.session.user = result.recordset;
                req.session.isAdmin = false;
                res.send({loggedIn:true, user: req.session.user, tickets: userTickets.recordset, isAdmin: req.session.isAdmin});
            }
            
        } else {
            res.send({message:"User doesn't exist"});
        }
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
};

 export const getLogout = (req,res) => {
    
    res.clearCookie("userId");
    res.send({message:"Cookie cleared successfully"});
};