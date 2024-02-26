import {Request, Response, Router} from 'express';
import cloudinary from 'cloudinary'
import multer from 'multer';
import Hotel from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { HotelType } from '../shared/types';


const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits:{
        fileSize: 5 * 1024 * 1024, //5MB
    }
})


router.post(
    "/", 
    verifyToken,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('country').notEmpty().withMessage('Country is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('type').notEmpty().withMessage('Hotel type is required'),
        body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night required is required'),
        body('facilities').notEmpty().isArray().withMessage('Facilities required is required'),
    ],
    upload.array("imageFiles", 6),
    async(req:Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const uploadPromises = imageFiles.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = "data:" + image.mimetype + ";base64," + b64
            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url;
        })

        const imageUrls = await Promise.all(uploadPromises)
        newHotel.imageUrls = imageUrls
        newHotel.lastUpdated = new Date(Date.now());
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel)
        await hotel.save();
        res.status(201).json({
            hotel
        })
    } catch (error) {
        console.log("Creating Hotels Error", error);
        res.status(500).json({
            message:"Something went wrong"
        })
    }

})


router.get("/", verifyToken, async(req:Request, res:Response) => {
    
    try {
        const hotels = await Hotel.find({userId: req.userId})
        res.status(200).json(
            hotels
        )
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
})




export default router;