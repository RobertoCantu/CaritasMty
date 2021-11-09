import * as yup from 'yup'

export const ticketSchema = yup.object().shape({
    title: yup.string().required("Ticket title is required"),
    department: yup.string().required("Select a department"),
    description: yup.string().required("Enter a description"),
    date: yup.date("Select date").required()
});