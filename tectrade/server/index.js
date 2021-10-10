//Express server
const express = require('express')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


//Middlewares 
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(session({
    key: "userId",
    secret: "secret",
    resave : false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

//Database connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "test",
})

//This would be for register if needed 
app.post("/login", (req,res) =>{

const username = req.body.username;
const password = req.body.password;
//Querie format
db.query("INSERT INTO user (name,password) VALUES (?,?)",
[username,password],
(err,result) =>{
    if(err){
        console.log(err);
    } else {
        console.log(result);
    }
    res.send(console.log("Listo"));
    
}

)


});

//Login 
app.get("/login", (req,res) => {
    db.query("SELECT * FROM user WHERE ")
} )



app.listen(3001, () => {
    console.log("It works")
})