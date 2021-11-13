import express from "express";
import cors from 'cors';
import session from 'express-session'
import cookieParser from "cookie-parser";


const app = express();

//Middlewares 
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", 'DELETE', "PUT"],
    credentials: true,
}));
//app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000,
    },
}))

export const auth = function (req,res,next){
    if(req.session.loggedIn == true){
        next();
        return;
    }
    res.send({message:"You are not authorized"})
}


export const formValidation= (schema) => async(req,res,next) =>{
    const body = req.body;
    console.log(body);

    try {
        await schema.validate(body);
        next();
        return;

    } catch(error){
        res.status(400).json({error});
    }
}
   

export default app;