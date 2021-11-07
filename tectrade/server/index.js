const express = require('express')
const app = express();
const cors = require('cors');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Process env Port process.env.Port 
const port = process.env.PORT || 3001;

//Admin users
const admin = ["juan@caritas.com","lorena@caritas.com","gerardo@caritas.com","sara@caritas.com"];

//Testing tickets
const tickets = [
{
id:"1",    
name:"Impresora falla",
departament:"Administracion",
description:"No tiene tinta",
date:"2021-10-22",
employeeEmail: "test@test"
},
{
id:"2",    
name:"No funciona el clima",
departament:"Administracion",
description:"El clima esta soltando mucha agua",
date:"2021-10-22",
employeeEmail: "test@test"}
]


//Middlewares 
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
//app.use(cors());
 app.use(cookieParser());
 app.use(express.urlencoded({extended:true}));

app.use(session({
    key: "userId",
    secret: "secret",
    resave : false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000,
    },
}))

//Database connection
//Sql server Connection Working
const dbSettings = {
    user: "root",
    password: "1234",
    server: "ROBERTOFIT",
    database: "Caritas",
    options: { 
        trustServerCertificate: true,
        } 
}

// async function getConnection(){
//     const pool = await sql.connect(dbSettings);
//     const result = await pool.request().query("SELECT * from users");
//     console.log(result);

// }

// getConnection();

//This was for mySql Connection
// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "password",
//     database: "test",
// });

app.get('/login', (req,res) =>{
    //Verify if a session already exists
    if(req.session.user){
        res.send({loggedIn:true, user: req.session.user})
    } else{
        res.send({loggedIn:false});
    }

})

app.post('/login',async function(req, res) {
    
    const userEmail = await req.body.userEmail;
    const userPassword = await req.body.userPassword;
    console.log(userPassword);
    try{
        const pool =  await sql.connect(dbSettings);
        const result= await pool
        .request()
        .input("Email",userEmail)
        .input("Password",userPassword)
        .query('SELECT * FROM users where Email = @Email AND Password = @Password');
        if(result.recordset.length > 0){
            req.session.user = result.recordset;
            //console.log(req.session.user);
            res.send(result.recordset);
        } else {
            res.send({message:"User doesn't exist"});
        }
    } catch(e){
        console.log(e);
    }
}) 

app.get('/logout', (req,res) => {
    
    res.clearCookie("userId");
    res.send({message:"Cookie cleared successfully"});
})

//Route for sending tickets based on employee username to the front end
app.get('/:usernameId/tickets', async (req,res) => {
    
    const usernameId = req.params.usernameId;
    try{
        const pool =  await sql.connect(dbSettings);
        const result= await pool
        .request()
        .input("UsernameId", usernameId)
        .query('SELECT tickets.TicketId,tickets.Title,tickets.Description,tickets.Date,tickets.Status FROM users INNER JOIN tickets ON users.UserId = tickets.UserId WHERE users.UserId = @UsernameId AND tickets.UserId = @UsernameId');
        console.log(result);
        if(result.recordset.length > 0){
            res.send(result.recordset);
        } else {
            res.send(result.recordset);
        }
    } catch(e){
        console.log(e);
    }

    //const result = tickets.filter(ticket => ticket.employeeEmail == username);
    //console.log(result);
   // res.send(result);
    
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})