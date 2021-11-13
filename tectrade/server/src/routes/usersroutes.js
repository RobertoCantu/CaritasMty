import { Router } from "express";
import { getLogin,postLogin,getLogout } from "../controllers/users.controllers";
import { auth,formValidation } from "../MiddleWares/app";
import { userSchema } from "../Validations/UserValidations";

const router = Router();

router.get('/login', auth, getLogin);

router.post('/login', formValidation(userSchema), postLogin);

router.get('/logout', getLogout);



export default router