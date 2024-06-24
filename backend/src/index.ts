import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';

//Express App Initialization
const app = express();



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
