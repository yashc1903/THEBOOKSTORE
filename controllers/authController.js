import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import orderModel from '../models/orderModel.js'
import JWT from 'jsonwebtoken'

//register
export const registerController = async(req,res) =>{
    try {
        const otp = req.otp;
        const {name,email,password,phone,answer,address} = req.body
        //validation
        if(!name){
            return res.send({message: 'name is required'})
        }
        if(!email){
            return res.send({message: 'email is required'})
        }
        if(!password || password.length<8){
            return res.send({message: 'password is required'})
        }
        if(!phone){
            return res.send({message: 'phone number is required'})
        }
        if(!address){
            return res.send({message: 'address is required'})
        }
        if(!answer){
            return res.send({message: 'answer is required'})
        }
        //existing user

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already registered please Login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);

        const user =  (await userModel.create({name ,email,phone,address,answer,password:hashedPassword,otp}))

        res.status(201).send({
            success:true,
            message:"Enter the otp sent to your email to verify yourself",
            user,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'there was an error please try again',
            error
        })
    }
}

//verify email
export const verifyEmailController = async (req,res) => {
    try {
		const { email, userOtp } = req.body;
		const numberedOtp = Number(userOtp);

		const userToBeVerified = await userModel.findOne({
			email,
			otp: numberedOtp,
		});
		if (!userToBeVerified) {
			await userModel.deleteOne({ email });
			return res.send({
				error: "Invalid otp, Please try signing up again",
			});
		} else return res.send({ message: "Registration successfull" });

	} catch (error) {
		return res.send({ error: error.message });
	}
};

//post login
export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        //validation 
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"invalid email or password"

            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'user not found'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"invalid password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"LOGIN successful",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role

            },token
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'there was an error in logging in',
            error
        })
    }

}

export const forgotPasswordController = async(req,res)=>{
    try {
        const {email,answer,newPassword}= req.body
        if(!email){
            res.status(400).send({
                message:"Email is required"
            })    
        }
        if(!answer){
            res.status(400).send({
                message:"answer is required"
            })    
        }
        if(!newPassword){
            res.status(400).send({
                message:"New Password is required"
            })    
        }
        //check 
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:'password reset sucessfully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
    }
}

export const updateProfileController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body
        const user = await userModel.findById(req.user._id)
        if(password && password.length<8){
            return res.json({error: "password is required and it should be atleast 8 characters"})
        }
        const hashedPassword = password ? await hashPassword(password):undefined
        const updatedUser= await userModel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        },{new:true})
        res.status(200).send({
            success:true,
            message:"user deatils updated successfully",
            updatedUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'there was an error in logging in',
            error
        })
    }
}

//test
export const testController = async(req ,res) => {
    try {
        res.send('protected routes')
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

export const getOrdersController = async(req,res) => {
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"something went wrong"
        })
    }
}


export const getAllOrdersController = async(req,res) => {
    try {
        const orders = await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort()
        res.json(orders) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"something went wrong"
        })
    }
}

export const orderStatusController  = async(req,res) => {
    try {
        const { orderId}  = req.params
        const {status} = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.json(orders)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"something went wrong"
        })
    }
}
