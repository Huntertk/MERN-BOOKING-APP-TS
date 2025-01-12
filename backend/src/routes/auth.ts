import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/login',
    [
        body('email')
        .notEmpty()
        .withMessage('Please provide email')
        .isEmail()
        .withMessage('Please provide valid email'),
        body('password')
        .notEmpty()
        .withMessage('Please provide password')
    ] , async (req:Request, res:Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()})
        }
        const {email, password} = req.body;
        try {
            const user = await User.findOne({email});
            
            if(!user){
                return res.status(400).json({message:"Invalid Credentials"});
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid Credentials"});
            }

            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY as string, {
                expiresIn: '1d'
            })
    
            res.cookie('auth_token', token, {
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000*60*60*24*1
            })
            res.status(200).json({userId:user._id})

        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Internal Server Error"})
        }
})

router.get('/validate-token', verifyToken, (req:Request, res:Response) => {
    try {
        res.status(200).send({user:req.userId})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.post('/logout', (req:Request, res:Response) => {
    try {
        res.status(200).cookie('auth_token', "", {
            expires:new Date(0),
        }).json({message:"user sign out successful"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})


export default router;