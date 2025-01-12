import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import hotelRoutes from './routes/my-hotels'
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';


//cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//Express App Initialization
const app = express();

//Db connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string )
    .then(() => console.log("DB is Connected"))
    .catch((err) => console.log(err))

//Middlwares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.static(path.join(__dirname, "..","..", "frontend", "dist")))

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/my-hotel', hotelRoutes)
app.get('*', (req:Request, res:Response) => {
    res.status(200).sendFile(path.join(__dirname, "..", "..", "frontend", "dist", "index.html"))
})

//Server 
app.listen(3000, () => {
    console.log("Server is running on PORT : 3000");
    
})
