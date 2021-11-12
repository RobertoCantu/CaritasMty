import * as yup from "yup";

// Used to fix bug.
const today = new Date();
today.setHours(0, 0, 0, 0);

export const ticketSchema = yup.object().shape({
  title: yup.string().required("El titulo del ticket es requerido"),
  department: yup.string().required("Selecciona un departamento"),
  description: yup.string().required("Ingresa una descripcion"),
  date: yup
    .date()
    .min(today, "Aun no podemos viajar al pasado")
    .max(new Date(), "Aun no podemos viajar al futuro")
    .typeError("Seleciona el dia de hoy")
});
