import express from 'express'
import {registerController} from '../controllers/authController.js'

//router object
const router = express.Router();

//routing

router.post('/register',registerController) //REGISTER || METHOD POST


export default router