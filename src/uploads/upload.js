require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env,
    api_key: process.env,
    api_secret: process.env
});

exports.upload = async(image) => {
    const result = await cloudinary.uploader.upload(image);
    return result.url;
}