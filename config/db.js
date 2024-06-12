import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongo database ${conn.connection.host}`)
    } catch (error) {
        console.log(`error in mongoDB ${error}`)
    }
} 


export default connectDB