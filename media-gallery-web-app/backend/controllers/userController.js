import User from '../models/user.model.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords for security
        res.status(200).json({
            message: 'Users fetched successfully',
            users
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { name, email, role }, 
            { new: true }
        );
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error: error.message });
    }
};

//deactivate user account By admin
const deactivateUser = async (req, res) => {
    try {
        // Prevent deactivating their own account
        if (req.params.id === req.user.id) {
            return res.status(400).json({ message: "You cannot deactivate your own admin account." });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { isActive: false },
            { new: true }
        );
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json({ message: 'User deactivated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Deactivation failed', error: error.message });
    }
};

export { getAllUsers, updateUserProfile, deactivateUser };