import React, {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom';
import './Login.css'
import  Axios  from 'axios';
import * as yup from 'yup'
import { userSchema } from '../../Validations/UserValidation';
import {UserContext} from '../../Helper/Context';
import {useForm} from 'react-hook-form'
import {yupResolver} from  '@hookform/resolvers/yup'

function Login() {
   
    
    const [userNotExist, setUserNotExist] = useState(false);
    const {user,setUser} = useContext(UserContext);
    let history = useHistory();
    Axios.defaults.withCredentials = true;
    
    //Front end Validation
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(userSchema),
    });
    

    const submitForm =  (data) => {
            Axios.post('http://localhost:3001/login',{
            userEmail: data.email,
            userPassword: data.password,
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
    console.log(errors);
    
    
    return (
        <div className="container text-center">
            <form onSubmit={handleSubmit(submitForm)}> 
                <h1>Please Sign in</h1>
                {userNotExist && <div className="alert alert-danger" role="alert">
                     Invalid Username/Password
                </div>}
                <label htmlFor="email" className="sr-only"></label>
                <input type="email" className="form-control" {...register('email')} placeholder="Email" autoFocus  />
                <p> {errors?.email?.message} </p>
                <label htmlFor="password"></label>
                <input type="password" placeholder="Password" {...register('password')}  className="form-control" />
                <p>{errors?.password?.message} </p>
                <div className="mt-3">
                    <input  type="submit" className="btn btn-lg btn-primary col-12" value="Login"/>
                </div>
            </form>
            
        </div>
    )
}

export default Login
