import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
//configuring env
dotenv.config()

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//enable CORS

app.use(cors({
    origin: 'http://localhost:8080', // Adjust this according to your client's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));

//routes
app.use('/api',authRoutes)

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
    console.log(`server running on ${PORT}`)
    
})