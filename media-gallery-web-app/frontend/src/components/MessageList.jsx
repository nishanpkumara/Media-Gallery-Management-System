import React from 'react';

export default function MessageList({ messages, isAdmin, onDelete }) {
    if (!messages || !Array.isArray(messages)) {
        return (
            <div className="mt-6 p-4 bg-gray-50 rounded border text-center text-gray-500">
                <p>Loading messages or no data available...</p>
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Contact Messages</h3>
            
            {messages.length === 0 ? (
                <p className="text-gray-500 italic">No messages found.</p>
            ) : (
                messages.map((msg) => (
                    <div 
                        key={msg._id} 
                        className="p-4 border rounded shadow-sm bg-white flex justify-between items-center hover:shadow-md transition-shadow"
                    >
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">{msg.message}</p>
                            
                            {isAdmin && (
                                <div className="mt-1">
                                    <p className="text-xs text-blue-600 font-semibold">
                                        From: {msg.name || "Unknown"} 
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Email: {msg.email || "N/A"}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 ml-4">
                            <button 
                                onClick={() => onDelete(msg._id)}
                                className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-600 hover:text-white transition-colors text-sm font-bold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}