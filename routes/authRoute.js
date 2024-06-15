import express from 'express'
import {registerController,loginController,testController,forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


//router object
const router = express.Router();

//routing

router.post('/register', registerController) //REGISTER || METHOD POST
router.post ('/login',loginController) //LOGIN || METHOD POST
router.post('/forgot-password',forgotPasswordController) // FORGOT-PASSWORD || METHOD POST
router.get('/test',requireSignIn,isAdmin, testController)

//protected  user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})
//admin protected route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})


export default router