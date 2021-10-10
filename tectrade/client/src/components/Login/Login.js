import React from 'react'
import './Login.css'

function Login() {
   
  
    return (
        <div className="container text-center">
            <form action="">
                <h1>Please Sign in</h1>
                <label htmlFor="email" className="sr-only"></label>
                <input type="email" className="form-control" placeholder="Email" required autoFocus />
                <label htmlFor="password"></label>
                <input type="password" placeholder="Password" className="form-control" />
                <div className="mt-3">
                    <button  className="btn btn-lg btn-primary col-12">Sign in</button>
                </div>
            </form>
            
        </div>
    )
}

export default Login
