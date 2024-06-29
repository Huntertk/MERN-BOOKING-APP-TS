import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import { verifyToken } from '../middleware/auth';
import { body, validationResult } from 'express-validator';


const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

router.post('/', 
    verifyToken,
    [
        body('name')
        .notEmpty()
        .withMessage("Name is Requierd"),
        body('city')
        .notEmpty()
        .withMessage("City is Requierd"),
        body('country')
        .notEmpty()
        .withMessage("Country is Requierd"),
        body('description')
        .notEmpty()
        .withMessage("City is Requierd"),
        body('type')
        .notEmpty()
        .withMessage("Hotel Type is Requierd"),
        body('pricePerNight')
        .notEmpty()
        .withMessage("Hotel price per night is Requierd")
        .isNumeric()
        .withMessage("Hotel price per night must be in numeric"),
        body('facilities')
        .notEmpty()
        .isArray()
        .withMessage("Hotel Type is Requierd"),
    ],
    upload.array("imageFiles", 6), 
    async (req:Request, res:Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()})
        }
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel:HotelType = req.body;

            //1. Fist Upload images to cloudinary
            const uploadPromises = imageFiles.map(async(image) => {
                const b64 = Buffer.from(image.buffer).toString('base64') 
                let dataURI = "data:" + image.mimetype + ';base64,' + b64 
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url
            })

            const imageUrls = await Promise.all(uploadPromises);

            //2. if upload was successful, add the urls to the new hotel
            newHotel.imageUrls = imageUrls
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;

            //3. save the new hotel to the db 
            const hotel = new Hotel(newHotel);
            await hotel.save();

            //4. return success response
            res.status(201).json(hotel)
        } catch (error) {
            console.log(error);
            res.status(500).json({messgae:"Internal Server Error"})
        }
})

export default router;