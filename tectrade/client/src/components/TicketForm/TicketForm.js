import React, {useState} from 'react'

function TicketForm() {

    const [ticket, setTicket] = useState({
        name: "",
        department: "",
        description: "",
        date: "",
    });


    //Method for handling the form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ticket);

        //Reset object and form
        setTicket({
            name: "",
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
                    <input type="text" onChange={e => setTicket({...ticket,name:e.target.value})} value={ticket.name} className="form-control" />
                </div>
                <div className="mb-3">
                <label  className="form-label">Departamento </label>
                <select onChange={e=> setTicket({...ticket,department: e.target.value})} value={ticket.department} className="form-select" >
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
