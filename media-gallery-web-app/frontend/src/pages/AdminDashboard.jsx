import React, { useEffect, useState } from 'react';
import { apiCall } from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiCall('/users/viewUsersByAdmin', 'GET', null);

                if (!response.error) {
                    const userData = Array.isArray(response) ? response : (response.users || []);
                    setUsers(userData);
                } else {
                    console.error("Error fetching users:", response.error);
                }
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Deactivate user
    const toggleUserActive = async (userId) => {
        try {
            const response = await apiCall(`/deactivate/${userId}`, 'PATCH', null);
            
            if (!response.error) {
                setUsers(prevUsers => 
                    prevUsers.map(u => u._id === userId ? { ...u, isActive: !u.isActive } : u)
                );
            } else {
                alert("Action failed: " + response.error);
            }
        } catch (err) {
            alert("Error updating user status");
        }
    };

    if (loading) return <p className="p-10 text-center">Loading Admin Panel...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">User Management (Admin Only)</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{user.name}</td>
                                    <td className="p-3 text-gray-600">{user.email}</td>
                                    <td className="p-3 uppercase text-xs font-bold">{user.role}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button 
                                            onClick={() => toggleUserActive(user._id)}
                                            className={`px-4 py-1 rounded text-sm font-semibold transition ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                        >
                                            {user.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-500">
                                    No users found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;