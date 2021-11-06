const express = require('express')
const app = express();
const mysql = require('mysql2');
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

async function getConnection(){
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query("SELECT * from users");
    console.log(result);

}

getConnection();

//This was for mySql Connection
// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "password",
//     database: "test",
// });




//Login 
//  app.get("/login",  (req,res) => {
//     const xd = req.body.name;
//     //const password = req.body.password;
//     db.connect(err => {
//         if(!err){
//             console.log("DB working");
//         }
//        // res.send("Hola");
//        // insert query 'INSERT INTO blogs (name,password) VALUES ("Hugo","cat")'
//        // SELECT * FROM blogs 
//         db.query('SELECT * FROM blogs'),
//         (err,rows,fields) => {
//             res.end();
//             if (err){
//                 console.log(err);
//             }
//             if (rows){
               
//                 res.send(rows);
//             } else {
//                 res.send({message:"Username doesnt exist"});
//             }
//             //db.close();
//         }
//     })
    
//     db.query("SELECT * from user "),
//    (err,result) => {
//        console.log("xd");
//         if (err){
//             res.send({err: err})
//         }

//         if (result) {
//             res.send(req.body);
//         } else {
//             res.send({message:"Username doesnt exist"});
//         }
//     }
//} )

app.get('/login', (req,res) =>{
    //Verify if a session already exists
    if(req.session.user){
        res.send({loggedIn:true, user: req.session.user})
    } else{
        res.send({loggedIn:false});
    }

})

app.post('/login',async function(req, res) {

    const userEmail = req.body.userEmail;
    try{
        const pool =  await sql.connect(dbSettings);
        const result= await pool
        .request()
        .input("Email",userEmail)
        .query('SELECT * FROM users where Email = @Email');
        if(result.recordset.length > 0){
            req.session.user = result.recordset;
            //console.log(req.session.user);
            res.send(result.recordset);
        } else {
            res.send({message:"User doesn't exist"});
        }
    } catch(e){
        //console.log(e);
    }
}) 

app.get('/logout', (req,res) => {
    
    res.clearCookie("userId");
    res.send({message:"Cookie cleared successfully"});
})

//Route for sending tickets based on employee username to the front end
app.get('/:username/tickets', (req,res) => {
    console.log(req.params);
    const username = req.params.username;
    const result = tickets.filter(ticket => ticket.employeeEmail == username);
    console.log(result);
    res.send(result);
    
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})