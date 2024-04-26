// routes/contactRoutes.js

import express from 'express';
import { createContact, getContacts, getContactById, updateContact, deleteContact } from '../controller/contactcontroller.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', getContacts);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
