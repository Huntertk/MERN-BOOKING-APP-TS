import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

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
app.get('/api/test', async (req:Request, res:Response) => {
    res.status(200).json({message:"Api is working"})
})

//Server 
app.listen(3000, () => {
    console.log("Server is running on PORT : 3000");
    
})
