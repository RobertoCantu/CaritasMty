import * as yup from 'yup'

export const userSchema = yup.object().shape({
    userEmail: yup.string().email().required("Email is required"),
    userPassword: yup.string().min(4).max(10).required()
});