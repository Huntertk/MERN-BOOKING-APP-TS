import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import userRoutes from './routes/users'
import authRoutes from './routes/auth'

//Express App Initialization
const app = express();

//Db connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string )
    .then(() => console.log("DB is Connected"))
    .catch((err) => console.log(err))

//Middlwares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());


//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

//Server 
app.listen(3000, () => {
    console.log("Server is running on PORT : 3000");
    
})
