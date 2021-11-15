import React,{useContext} from 'react'
import { UserContext } from '../../Helper/Context'
import EmployeeHome from '../EmployeeHome/EmployeeHome';
import AdminHome from '../AdminHome/AdminHome';



function HomeWrapper() {
    const {user} = useContext(UserContext);
    return (
        <div>
            {user.isAdmin ? 
            <AdminHome/>
            :
            <EmployeeHome/>    
        }  
        </div>
    )
}

export default HomeWrapper
