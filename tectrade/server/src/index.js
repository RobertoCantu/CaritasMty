import usersRoutes from '../src/routes/usersroutes.js';
import ticketsRoutes from '../src/routes/ticketsroutes';
const express = require('express')
const app = express();
const cors = require('cors');
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
// const dbSettings = {
//     user: "root",
//     password: "1234",
//     server: "ROBERTOFIT",
//     database: "Caritas",
//     options: { 
//         trustServerCertificate: true,
//         } 
// }

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

//Routes
app.use(usersRoutes);
app.use(ticketsRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})