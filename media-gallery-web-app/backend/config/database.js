import mongoose from 'mongoose';

//db connection
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`\n MongoDB connected!!! :${conn.connection.host}`)
    } catch (error) {
        console.error('Database connection error:',error)
        process.exit(1);
    }
};

export default connectDB;