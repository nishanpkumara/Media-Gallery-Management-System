import React, { useEffect, useState } from 'react';
import { apiCall } from '../services/api';
import ImageDetail from '../components/ImageDetail'; // For full-screen view
// import Navbar from '../components/Navbar'; // Assuming you have a layout navbar

export default function MediaGalleryPage() {
    const [media, setMedia] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [viewingImage, setViewingImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchGallery = async (query = "") => {
        setLoading(true);
        const res = await apiCall(`/media?search=${query}`, 'GET');
        if (!res.error) {
            setMedia(res);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        fetchGallery(e.target.value);
    };

    const toggleSelection = (imageUrl) => {
        if (selectedImages.includes(imageUrl)) {
            setSelectedImages(selectedImages.filter(url => url !== imageUrl));
        } else {
            setSelectedImages([...selectedImages, imageUrl]);
        }
    };

    const handleZipDownload = async () => {
        if (selectedImages.length === 0) return alert("Select images first!");
        
        const res = await apiCall('/media/download-zip', 'POST', { imageUrls: selectedImages });
        alert("Preparing your ZIP file...");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Media Gallery</h1>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <input 
                            type="text"
                            placeholder="Search by title or #tag..."
                            className="p-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button 
                            onClick={handleZipDownload}
                            className={`px-4 py-2 rounded-lg text-white font-bold transition ${
                                selectedImages.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Download ZIP ({selectedImages.length})
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading gallery...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {media.map((item) => (
                            <div key={item._id} className="relative group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                                <input 
                                    type="checkbox"
                                    className="absolute top-3 left-3 z-10 w-5 h-5 cursor-pointer"
                                    checked={selectedImages.includes(item.imageUrl)}
                                    onChange={() => toggleSelection(item.imageUrl)}
                                />
                                
                                <div 
                                    className="h-48 overflow-hidden cursor-pointer"
                                    onClick={() => setViewingImage(item)}
                                >
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {item.tags?.map(tag => (
                                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewingImage && (
                    <ImageDetail 
                        image={viewingImage} 
                        onClose={() => setViewingImage(null)} 
                    />
                )}
            </div>
        </div>
    );
}