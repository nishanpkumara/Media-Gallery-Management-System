import Media from '../models/media.model.js';
// import cloudinary from 'cloudinary'; // Make sure to config this in server.js

// // 1. Upload Media
// const uploadMedia = async (req, res) => {
//     try {
//         const { title, description, tags } = req.body;
        
//         // Upload to Cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'gallery',
//             resource_type: 'auto'
//         });

//         const newMedia = new Media({
//             title,
//             description,
//             tags: tags.split(','), // Convert string to array
//             imageUrl: result.secure_url,
//             publicId: result.public_id,
//             userId: req.user.id
//         });

//         await newMedia.save();
//         res.status(201).json(newMedia);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// 2. Get All Media (with Search/Filter) [cite: 17]
const getGallery = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { tags: { $in: [new RegExp(search, 'i')] } }
                ]
            };
        }

        const media = await Media.find(query).sort({ createdAt: -1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getGallery }; //uploadMedia should be exported when implemented