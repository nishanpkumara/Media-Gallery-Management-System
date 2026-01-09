import Contact from "../models/contact.model.js";

const createContact = async (req, res) => {
    try {
        const {name, email, message} = req.body;
        const userId = req.user.id;
        if(!name || !email || !message || !userId){
            return res.status(400).json({message: 'All fields are required'});
        }

        if(email !== req.user.email){
            return res.status(403).json({message: 'Email does not match!!!'});
        }
        
        const newContact = new Contact({name, email, message, userId});
        await newContact.save();

        return res.status(201).json({
            message: 'Contact created succesfully!!!',
            newContact
        });
    } catch (error) {
        res.status(500).json({message: 'Server Error',error: error.message});
    }
};

const viewMessages = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.id });
        
        res.status(200).json({
            message: 'Messages fetched successfully',
            contacts
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateMessage = async(req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'No message content provided' });
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, 
            { message },
            { new: true}
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        return res.status(200).json({
            message: 'Contact updated successfully',
            updatedContact
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const deleteMessage = await Contact.findById(req.params.id);
        if(!deleteMessage){
            return res.status(404).json({message: 'Message not found'});
        }


        return res.status(200).json({message: 'Message deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

const viewMessagesByAdmin = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            message: 'All messages fetched successfully',
            contacts
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export {createContact, viewMessages, updateMessage, deleteMessage, viewMessagesByAdmin};