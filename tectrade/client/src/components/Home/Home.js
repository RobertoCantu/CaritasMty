import React from 'react'
import {useContext} from 'react'
import { UserContext } from '../../Helper/Context';
function Home() {
    const {user} = useContext(UserContext);
    
    return (
        
        <div className="home">
            <h1>Bienvenido {user.firstName}</h1>
            <h1>Pending Tickets</h1>
            <h1>Resolved Tickets</h1>
        </div>
    )
}

export default Home
