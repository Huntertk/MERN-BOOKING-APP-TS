import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import {check, validationResult} from 'express-validator'

const router = express.Router();

// /api/users/register
router.post('/register', [
    check('firstName', 'first name is required').isString(),
    check('lastName', 'last name is required').isString(),
    check('email', 'email is required').isEmail(),
    check('password', 'passowrd is required with 8 or more character').isLength({min:6}),

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
        })
        return res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

export default router;