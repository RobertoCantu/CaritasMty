import * as yup from 'yup'

export const ticketSchema = yup.object().shape({
    title: yup.string().required("El titulo del ticket es requerido"),
    department: yup.string().required("Selecciona un departamento"),
    description: yup.string().required("Ingresa una descripcion"),
    date: yup.date().min(new Date(),"Aun no podemos viajar al pasado").max(new Date(), "Aun no podemos viajar al futuro").typeError('Seleciona el dia de hoy')
});