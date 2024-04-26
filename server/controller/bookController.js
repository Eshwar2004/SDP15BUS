// controllers/bookController.js

import Book from '../models/book.js';

export const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = new Book(bookData);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.toString() });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.toString() });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book by id', error: error.toString() });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.toString() });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.toString() });
  }
};