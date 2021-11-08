import React, {useState,useContext} from 'react'
import Axios from 'axios';
import {UserContext} from '../../Helper/Context';

function TicketForm() {
    const {user} = useContext(UserContext);
    Axios.defaults.withCredentials = true;
    const [ticket, setTicket] = useState({
        title: "",
        department: "",
        description: "",
        date: "",
    });


    //Method for handling the form
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/createTicket',{
            ticketTitle: ticket.title,
            ticketDepartment: ticket.department,
            ticketDescription: ticket.description,
            ticketDate: ticket.date,
            ticketUserId: user.id
        }).
        then((res,err) => {
            if(err){
                console.log(err);
            }
            // if(res.data.message){
            //     console.log("Username doesnt exist");
            //     setUserNotExist(true);
            // } else {
            //     setUser({
            //         id: res.data[0].UserId,
            //         email: res.data[0].Email,
            //         firstName: res.data[0].FirstName,
            //         lastName: res.data[0].LastName,
            //         tickets: [],
            //         loggedIn:true});
            //     history.push("/");
            // }
        })

        //Reset object and form
        setTicket({
            title: "",
            department: "",
            description: "",
            date: "",
        });
        
    }
    return (
        <div className="">
            <form>
                <div  className="mb-3 form-outline ">
                    <label  className="form-label">Nombre del incidente: </label>
                    <input type="text" onChange={e => setTicket({...ticket,title:e.target.value})} value={ticket.title} className="form-control" />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Departamento </label>
                    <select onChange={e=> setTicket({...ticket,department: e.target.value})} value={ticket.department} className="form-select"  >
                        <option hidden >Selecciona un Departamento</option>
                        <option value="Administracion">Administracion</option>
                        <option value="Finanzas">Finanzas</option>
                        <option value="Recursos Humanos">Recursos Humanos</option>
                        <option value="Sistemas">Sistemas</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion: </label>
                    <textarea className="form-control" onChange={e => setTicket({...ticket,description:e.target.value})} value={ticket.description} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha: </label>
                    <input type="date" onChange={e => setTicket({...ticket,date:e.target.value})} value={ticket.date} className="form-control" rows="3"/>
                </div>
                
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Enviar</button>
            </form>
            
        </div>
    )
}

export default TicketForm
