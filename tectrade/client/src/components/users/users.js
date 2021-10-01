import {useState, useEffect} from 'react'

const Users = () => {

    const [users,setUsers] = useState(null);

    
    useEffect(() => {
        fetch('https://randomuser.me/api/').then(res => res.json()).then(data => 
        {
            //console.log(data.results[0].gender);
            setUsers(data.results);
          // console.log(data.results) 
          //console.log(users);
          //console.log("whar")
        }).catch(e => console.log(e));
        
    }, [])

    //console.log(users);
    

    const [count,setCount] = useState(0);
    return ( 
        <div>
            <button onClick={() => setCount(count+1)} className="btn btn-danger">Counter</button>
            <p>El contador es de {count}</p>
            {users && users.map((user) => (
                <div key={user.id}> 
                    <h1>{user.gender}</h1>
                </div>
            ))
            }

        </div> 
        

);
}
 
export default Users;