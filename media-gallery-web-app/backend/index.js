import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './server.js'

dotenv.config();

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