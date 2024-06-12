import express from 'express'
import {registerController,loginController,testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


//router object
const router = express.Router();

//routing

router.post('/register', registerController) //REGISTER || METHOD POST
router.post ('/login',loginController) //LOGIN || METHOD POST
router.get('/test',requireSignIn,isAdmin, testController)


export default router