import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' })

        //file is uploaded successfully
        console.log("File is uploaded on Cloudinary.", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //removes the locally saved temp file if upload operation got failed.
        return null
    }
}

cloudinary.uploader.upload('https://i1-e.pinimg.com/1200x/3c/2a/e7/3c2ae7d209bcf3bf88f7d4fbbf7b35e0.jpg',
    { public_id: 'batman' },
    function (err, result) { console.log(result) })

export { uploadOnCloudinary } 