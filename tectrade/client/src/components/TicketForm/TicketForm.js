import React, {useState,useContext,useEffect} from 'react'
import Axios from 'axios';
import {UserContext} from '../../Helper/Context';
import {useForm} from 'react-hook-form'
import {yupResolver} from  '@hookform/resolvers/yup'
import { ticketSchema } from '../../Validations/TicketValidation';

function TicketForm() {
    const {user} = useContext(UserContext);
    Axios.defaults.withCredentials = true;
    const [success,setSuccess] = useState(false);
   
    //Front end Validation
    const {register,handleSubmit,formState:{errors},reset} = useForm({
        resolver: yupResolver(ticketSchema),
    });



    //Method for handling the form
    const submitForm = (data) => {
        Axios.post('http://localhost:3001/createTicket',{
            ticketTitle: data.title,
            ticketDepartment: data.department,
            ticketDescription: data.description,
            ticketDate: data.date,
            ticketUserId: user.id
        }).
        then((res,err) => {
            if(err){
                console.log(err);
            } 
            else if(res.data.messageSuccess){
                setSuccess(true);
            }
        })

        //Reset form
        reset({})
    }
    return (
        <div className="">
            {success && 
            <div className="alert alert-success" role="alert">
                Ticket Creado exitosamente
            </div>}
            <form onSubmit={handleSubmit(submitForm)}>
                <div  className="mb-3 form-outline ">
                    <label  className="form-label">Nombre del incidente: </label>
                    <input type="text" {...register('title')} className="form-control" />
                    <p className="empty">{errors?.title?.message}</p>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Departamento </label>
                    <select  className="form-select" {...register('department')}  >
                        <option value="Administracion">Administracion</option>
                        <option value="Marketing" >Marketing</option>
                        <option value="Finanzas">Finanzas</option>
                        <option value="Recursos Humanos">Recursos Humanos</option>
                        <option value="Sistemas">Sistemas</option>
                    </select>
                    <p className="empty">{errors?.department?.message}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion: </label>
                    <textarea className="form-control" {...register('description')}  id="exampleFormControlTextarea1" rows="3"></textarea>
                    <p className="empty">{errors?.description?.message}</p>

                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha: </label>
                    <input type="date"  {...register('date')}  className="form-control" rows="3"/>
                    <p className="empty">{errors?.date?.message}</p>
                </div>
                
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            
        </div>
    )
}

export default TicketForm
