import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import safeBuffer from 'safe-buffer';
//configuring env
dotenv.config()

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));


//enable CORS
app.use(cors());

//routes
app.use('/',authRoutes);
app.use('/',categoryRoutes);
app.use('/',productRoutes);

//rest api
app.get('/',(req,res)=>{
    res.send({
        message: 'welcome to the bookstore'
    })
})


//PORT
const PORT = process.env.PORT || 8080 

//run listen

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});