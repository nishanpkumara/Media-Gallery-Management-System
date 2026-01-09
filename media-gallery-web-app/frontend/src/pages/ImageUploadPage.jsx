import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { apiCall } from '../services/api';

export default function ImageUploadPage() {
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState({ title: '', description: '', tags: '' });

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {'image/jpeg': [], 'image/png': []},
        maxSize: 5242880 // 5MB
    });

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', metadata.title);
        formData.append('description', metadata.description);
        formData.append('tags', metadata.tags);

        const res = await apiCall('/media/upload', 'POST', formData, true);
        if (!res.error) alert('Upload Successful!');
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Upload New Image</h2>
            <div {...getRootProps()} className="border-2 border-dashed p-10 text-center cursor-pointer mb-4">
                <input {...getInputProps()} />
                {file ? <p>{file.name}</p> : <p>Drag & drop image here, or click to select</p>}
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
                <input type="text" placeholder="Title" className="w-full p-2 border" 
                       onChange={e => setMetadata({...metadata, title: e.target.value})} />
                <textarea placeholder="Description" className="w-full p-2 border"
                       onChange={e => setMetadata({...metadata, description: e.target.value})} />
                <input type="text" placeholder="Tags (comma separated)" className="w-full p-2 border"
                       onChange={e => setMetadata({...metadata, tags: e.target.value})} />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full">Upload</button>
            </form>
        </div>
    );
}