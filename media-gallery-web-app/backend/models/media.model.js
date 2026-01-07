import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String 
    },
    tags: [String],
    imageUrl: {
        type: String, 
        required: true 
    }, // URL from Cloudinary
    publicId: { 
        type: String, 
        required: true 
    }, // Cloudinary public ID
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Media', mediaSchema);