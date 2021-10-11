import React, {useState} from 'react'
import './Login.css'
import  Axios  from 'axios';

function Login({func}) {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
        console.log("Si entra");
        
        Axios.post('http://localhost:3001/login',{
            name: email,
            password: password,
        }).
        then((res,err) => {
            console.log("Esto ya nunca entra");
            if(err){
                console.log(err);
            }
            console.log(res);
        })
    }
  
    return (
        <div className="container text-center">
            <form action="" method="post"> 
                <h1>Please Sign in</h1>
                <label htmlFor="email" className="sr-only"></label>
                <input type="name" className="form-control" onChange = {(e) => {setEmail(e.target.value)}} placeholder="Email" required autoFocus value={email} />
                <label htmlFor="password"></label>
                <input type="name" placeholder="Password" onChange={e => setPassword(e.target.value)} className="form-control" value={password} />
                <div className="mt-3">
                    <input  type="submit" onClick = {submit} className="btn btn-lg btn-primary col-12" value="Login"/>
                </div>
            </form>
            
        </div>
    )
}

export default Login
