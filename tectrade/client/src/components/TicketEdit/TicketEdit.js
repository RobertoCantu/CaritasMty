import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios';
import { UserContext } from '../../Helper/Context';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ticketSchema } from '../../Validations/TicketValidation';
import "./TicketEdit.css"

function TicketEdit({ ticket, changeEdit }) {
    const { user, setUser } = useContext(UserContext);
    Axios.defaults.withCredentials = true;
    const [success, setSuccess] = useState(false);
    const [title, setTitle] = useState(ticket.Title);
    const [desc, setDesc] = useState(ticket.Description);

    //Front end Validation
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(ticketSchema),
    });

    //Method for handling the form
    const submitForm = (data) => {
        Axios.put(`http://localhost:3001/editTicket/${ticket.TicketId}`, {
            ticketTitle: data.title,
            ticketDepartment: data.department,
            ticketDescription: data.description,
            ticketDate: data.date
        }).then((res, err) => {
            if (err) {
                console.log(err);
            }
            else if (res.data.messageSuccess) {
                setSuccess(true);
                Axios.get(`http://localhost:3001/${user.id}/tickets`).
                    then((res) => {
                        setUser({ ...user, tickets: res.data });
                    }).catch(error => {
                        console.log(error);
                    })
            }
        })

        //Reset form
        reset({})

        changeEdit(false);
    }

    return (
        <div className="">
            <div className="modal-content">
                <div className="">
                    {success &&
                        <div class="alert alert-success" role="alert">
                            Ticket Editado exitosamente
                            </div>}
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-3 form-outline ">
                            <label className="form-label">Nombre del incidente: </label>
                            <input type="text" value={title} {...register('title')} className="form-control" onChange={e => setTitle(e.target.value)} />
                            <p>{errors ?.title ?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Departamento </label>
                            <select className="form-select" {...register('department')}  >
                                <option value="Administracion">Administracion</option>
                                <option value="Marketing" >Marketing</option>
                                <option value="Finanzas">Finanzas</option>
                                <option value="Recursos Humanos">Recursos Humanos</option>
                                <option value="Sistemas">Sistemas</option>
                            </select>
                            <p>{errors ?.department ?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripcion: </label>
                            <textarea className="form-control" value={desc} {...register('description')} id="exampleFormControlTextarea1" rows="3" onChange={e => setDesc(e.target.value)}></textarea>
                            <p>{errors ?.description ?.message}</p>

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha: </label>
                            <input type="date" defaultValue={ticket.Date} {...register('date')} className="form-control" rows="3" />
                            <p>{errors ?.date ?.message}</p>
                        </div>

                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>

                </div>
            </div>
            <div className="overlay" onClick={() => changeEdit(false)}></div>
        </div>
    )
}

export default TicketEdit;