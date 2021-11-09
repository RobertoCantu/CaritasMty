import { getConnection,queries } from "../database";

//Admin users
const admin = ["gerardo@caritas.com","sara@caritas.com"];

export const getLogin = (req,res) =>{
    //Verify if a session already exists
    if(req.session.user){
        console.log(req.session);
        res.send({loggedIn:true, user: req.session.user})
    } else{
        res.send({loggedIn:false});
    }

};


export const postLogin =async function(req, res) {
    
    const userEmail = await req.body.userEmail;
    const userPassword = await req.body.userPassword;
    console.log(userPassword);
    try{
        const pool =  await getConnection();
        const result= await pool
        .request()
        .input("Email",userEmail)
        .input("Password",userPassword)
        .query(queries.getUser);

        if(result.recordset.length > 0){
            
            req.session.user = result.recordset;
            req.session.isAdmin = false;
            
            //console.log(req.session.user);
            res.send(result.recordset);
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