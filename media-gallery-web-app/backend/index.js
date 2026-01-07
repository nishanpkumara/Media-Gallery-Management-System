import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './server.js'
// import cloudinary from 'cloudinary';

dotenv.config();

// // Configuration
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// console.log("Cloudinary Connected Successfully");

const startServer = async () =>{
    try {
        await connectDB();

        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port: ${process.env.PORT}`)
        });
    } catch (error) {
        console.log('Failed to start server', error)
    }
};

startServer();