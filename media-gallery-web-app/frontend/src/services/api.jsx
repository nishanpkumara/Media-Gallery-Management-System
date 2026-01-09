const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async (endpoint, method, data, isFile = false) => {

    const token = localStorage.getItem('token');

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            headers: headers,
            body: isFile ? data : (data ? JSON.stringify(data) : null),
        });
        return await response.json();
    } catch (error) {
        return { error: "Connection failed to server" };
    }
};


    const uploadMedia = async (formData) => {
        return await apiCall('/media/upload', 'POST', formData, true); 
    };

    const fetchGallery = async (searchTerm = "") => {
        return await apiCall(`/media?search=${searchTerm}`, 'GET');
    };