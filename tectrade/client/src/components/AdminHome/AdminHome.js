import React,{useContext} from 'react'
import { UserContext } from '../../Helper/Context'

function AdminHome() {
    const {user} = useContext(UserContext);
    return (
        <div>
            <h1>Current Tickets to resolve</h1>
            
        </div>
    )
}

export default AdminHome
