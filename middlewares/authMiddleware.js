import express from 'express'
import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express();
dotenv.config();
app.use(cors());



//protected routes token based

export const requireSignIn = async(req ,res,next) => {
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }
    
}

//admin access
export const isAdmin = async (req, res,next ) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"unauthorized access"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success:false,
            error,
            message:"error in admin middleware"
        })
    }

}

export const sendEmailMiddleware = async (req, res, next) => {
	try {
		const { email } = req.body;

		// finding if any user with same email already exists
		const existingUser = await userModel.findOne({ email });
		if (existingUser) return res.send({ error: "User already exists" });

		// so let's create the otp
		var otp = "";
		function generateOTP() {
			for (var i = 0; i < 6; i++) {
				otp += Math.floor(Math.random()* 10);
			}
			return otp;
		}
		// generating otp
		var otp = generateOTP();

		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		});

		// Email data
		const mailOptions = {
			from: process.env.user,
			to: email,
			subject: "Verify your email",
			text: `Your one time password is ${otp}`,
		};

		// Send email
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res.status(500).json({
					 message: "Error occurred while sending email.",
				});
			} else {
				return res.json({ message: "Email sent successfully." });
			}
		});
		req.otp = otp;
		next();
	} catch (error) {
		console.error(error);
    return res.status(500).json({ message: 'Error occurred' });
	}
};
