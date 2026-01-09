import React, { useEffect, useState } from 'react';
import { apiCall } from '../services/api';

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await apiCall('/admin/users', 'GET');
            if (data && !data.error) setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId, currentStatus) => {
        const res = await apiCall(`/admin/users/${userId}/status`, 'PATCH', { 
            isActive: !currentStatus 
        });
        if (!res.error) {
            setUsers(users.map(u => u._id === userId ? { ...u, isActive: !currentStatus } : u));
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">User Management (Admin)</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Role</th>
                        <th className="p-3 border">Status</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-b">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3 capitalize">{user.role}</td>
                            <td className="p-3">
                                <span className={user.isActive ? "text-green-600" : "text-red-600"}>
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="p-3">
                                <button 
                                    onClick={() => handleToggleStatus(user._id, user.isActive)}
                                    className={`px-3 py-1 rounded text-white ${user.isActive ? "bg-red-500" : "bg-green-500"}`}
                                >
                                    {user.isActive ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}