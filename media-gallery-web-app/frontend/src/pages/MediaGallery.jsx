import React, { useState, useEffect } from 'react';

const MediaGallery = () => {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]); // For ZIP download [cite: 21]

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleZipDownload = async () => {
    // Call the backend /api/media/zip with selected IDs [cite: 23]
    alert(`Downloading ${selected.length} items as ZIP`);
  };

  return (
    <div>
        <div className="flex justify-between mb-6">
            <input 
                className="border p-2 rounded w-1/3"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleZipDownload} className="bg-green-600 text-white px-4 py-2 rounded">
                Download Selection (ZIP)
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {media.filter(item => item.title.includes(search)).map(item => (
                <div key={item._id} className="border rounded relative p-2">
                    <input 
                        type="checkbox" className="absolute top-2 left-2" 
                        onChange={() => toggleSelect(item._id)} 
                    />
                    <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded" />
                    <h3 className="font-bold mt-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.tags.join(', ')}</p>
                </div>
            ))}
      </div>
    </div>
  );
};

export default MediaGallery;