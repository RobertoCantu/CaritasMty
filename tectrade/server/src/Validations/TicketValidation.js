import * as yup from "yup";

// Used to fix bug.
const today = new Date();
today.setHours(0, 0, 0, 0);

export const ticketSchema = yup.object().shape({
  ticketTitle: yup.string().required("El titulo del ticket es requerido"),
  ticketDepartment: yup.string().required("Selecciona un departamento"),
  ticketDescription: yup.string().required("Ingresa una descripcion"),
  ticketDate: yup
    .date()
    .min(today, "Aun no podemos viajar al pasado")
    .max(new Date(), "Aun no podemos viajar al futuro")
    .typeError("Seleciona el dia de hoy"),
ticketUserId: yup.number().required(),
});