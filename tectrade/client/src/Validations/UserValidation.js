import * as yup from 'yup'

export const userSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).max(10).required("Password length should be between 4 and 12 characteres")
});