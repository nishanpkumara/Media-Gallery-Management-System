import React from 'react';

export default function ImageDetail({ image, onClose }) {
    if (!image) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <button onClick={onClose} className="absolute top-5 right-5 text-white text-3xl">&times;</button>
            <div className="bg-white max-w-4xl w-full rounded-lg overflow-hidden flex flex-col md:flex-row">
                <img src={image.imageUrl} alt={image.title} className="w-full md:w-2/3 object-contain h-96 md:h-auto" />
                <div className="p-6 md:w-1/3">
                    <h2 className="text-2xl font-bold">{image.title}</h2>
                    <p className="text-gray-600 mt-2">{image.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {image.tags.map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}