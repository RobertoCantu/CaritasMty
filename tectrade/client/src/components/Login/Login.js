import React, {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom';
import './Login.css'
import  Axios  from 'axios';
import {UserContext} from '../../Helper/Context';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userNotExist, setUserNotExist] = useState(false);
    const {user,setUser} = useContext(UserContext);
    let history = useHistory();
    Axios.defaults.withCredentials = true;
    //This function contains the form logic it create the user object with the
    //information obtained from the server
    const submit = (e) => {

        //Front end Validation
        e.preventDefault();        
        Axios.post('http://localhost:3001/login',{
            userEmail: email,
            userPassword: password,
        }).
        then((res,err) => {
            if(err){
                console.log(err);
            }
            if(res.data.message){
                console.log("Username doesnt exist");
                setUserNotExist(true);
            } else {
                setUser({
                    id: res.data[0].UserId,
                    email: res.data[0].Email,
                    firstName: res.data[0].FirstName,
                    lastName: res.data[0].LastName,
                    tickets: [],
                    loggedIn:true});
                history.push("/");
            }
        })
    }
    
    
    return (
        <div className="container text-center">
            <form action="" method="post"> 
                <h1>Please Sign in</h1>
                {userNotExist && <div className="alert alert-danger" role="alert">
                     Invalid Username/Password
                </div>}
                <label htmlFor="email" className="sr-only"></label>
                <input type="email" className="form-control" onChange = {(e) => {setEmail(e.target.value)}} placeholder="Email" required autoFocus value={email} />
                <label htmlFor="password"></label>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="form-control" value={password} />
                <div className="mt-3">
                    <input  type="submit" onClick = {submit} className="btn btn-lg btn-primary col-12" value="Login"/>
                </div>
            </form>
            
        </div>
    )
}

export default Login
