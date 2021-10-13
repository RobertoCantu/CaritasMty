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
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "test",
});




//This would be for register if needed 
// app.post("/register", (req,res) =>{

// const username = req.body.name;
// const password = req.body.password;
// //res.send("hola");

// //Querie format
// db.query("INSERT INTO user (name,password) VALUES (?,?)",
// [username,password],
// (err,result) =>{
//     if(err){
//         console.log(err);
//     } else {
//         console.log(result);
//     }
//     //res.send(console.log("Listo"));
    
// }

// )


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

app.post('/login',function(req, res) {

    const userName = req.body.name;
    
	
		db.query('SELECT * FROM pizza WHERE name = ?', [userName], function(err, rows, fields) {
			//if(err) throw err
            
			if (err) {
                console.log(err)
				res.send("hola")
			} 
            if (rows.length > 0){
                req.session.user = rows;
                console.log(req.session.user);
                res.send(rows);
            } else {
                res.send({message:"User doesn't exist"})
            }
		})
	
}) 



app.listen(3001, () => {
    console.log("It works")
})