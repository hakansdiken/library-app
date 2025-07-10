import express from 'express';
import { BookService } from '../domain/book/book.service.js';
import { BookRepository } from '../domain/book/book.repository.js';

const router = express.Router();
const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);

router.get('/', async (req, res) => {

    try {

        const result = await bookService.getAllBooks();

        if (!result.success) {

            return res.status(500).json(result);
        }

        res.status(200).json(result);
    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/:id', async (req, res) => {

    try {

        const result = await bookService.getBookById(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }


        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/', async (req, res) => {

    try {

        const bookData = req.body;
        const result = await bookService.createBook(bookData);

        if (!result.success) {

            return res.status(400).json(result);
        }

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.put('/:id', async (req, res) => {

    try {

        const result = await bookService.updateBook(req.params.id, req.body);

        if (!result.success) {

            if (result.message === "Book not found!") {

                return res.status(404).json(result);
            }
            return res.status(400).json(result);
        }

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete('/:id', async (req, res) => {

    try {

        const result = await bookService.deleteBook(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
