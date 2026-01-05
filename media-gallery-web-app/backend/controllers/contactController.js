import Contact from "../models/Contact.js";

const createContact = async (req, res) => {
    try {
        const {name, email, message, userId} = req.body;
        if(!name || !email || !message || !userId){
            return res.status(400).json({message: 'All fields are required'});
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

const viewContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).json({
            message: 'List of contacts!!!',
            contacts
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',error: error.message
        });
    }
};

const updateContact = async(req,res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: 'No data provided'});
        }
        const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updateContact){
            return res.status(404).json({message: 'Contact not found'});
        }
        return res.status(200).json({
            message: 'Contact updated successfully',
            updateContact
        })
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
};

const deleteContact = async (req, res) => {
    try {
        const deleteContact = Contact.findByIdAndDelete(Object.params.id);
        if(!deleteContact){
            return res.status(404).json({message: 'Contact not found'});
        }
        return res.status(200).json({message: 'Contact deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

export {createContact, viewContact, updateContact, deleteContact};