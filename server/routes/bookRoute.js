// routes/bookRoutes.js

import express from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controller/bookController.js';

const router = express.Router();

// Create a new book
router.post('/', createBook);

// Get all books
router.get('/', getBooks);

// Get a book by ID
router.get('/:id', getBookById);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

export default router;