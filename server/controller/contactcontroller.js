// controllers/contactController.js

import Contact from '../models/contactmodel.js';

export const createContact = async (req, res) => {
  try {
    const contactData = req.body;
    const newContact = new Contact(contactData);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.toString() });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.toString() });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact by id', error: error.toString() });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedData = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.toString() });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.json({ message: 'Contact deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.toString() });
  }
};
