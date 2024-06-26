import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import {body, validationResult} from 'express-validator'

const router = express.Router();

// /api/users/register
router.post('/register', [
    body('firstName')
    .notEmpty()
    .withMessage('firstName is required')
    .isString()
    .withMessage('please provide firstname as string'),
    body('lastName')
    .notEmpty()
    .withMessage('lastName is required')
    .isString()
    .withMessage('please provide lastname as string'),
    body('email')
    .notEmpty()
    .withMessage('lastName is required')
    .isEmail()
    .withMessage('please provide valid email'),
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:6})
    .withMessage('passowrd is required with 8 or more character'),
] , async (req:Request, res:Response) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()})
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({message:"User already registered"});
        }
        user = new User(req.body);
        await user.save();
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1d'
        })

        res.cookie('auth_token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000*60*60*24*1
        });
        
        res.status(200).json({message:"User Registered Successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default router;