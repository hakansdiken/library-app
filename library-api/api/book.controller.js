import express from 'express';
import { BookService } from '../domain/book/book.service.js';
import { BookRepository } from '../domain/book/book.repository.js';
import { Roles } from '../domain/constants/roles.js';
import { authorize } from '../infrastructure/middlewares/authorize.middleware.js';
import { BookValidator } from '../domain/book/book.validator.js';
import { BookApplication } from '../application/book.application.js'

const router = express.Router();
const bookRepository = new BookRepository();
const bookValidator = new BookValidator();
const bookService = new BookService(bookRepository, bookValidator);
const bookApplication = new BookApplication(bookService);

router.get('/', authorize([Roles.ADMIN, Roles.LIBRARIAN, Roles.MEMBER]), async (req, res) => {

    try {

        const { page = 0, limit = 10, search = '' } = req.query;

        const result = await bookApplication.getAllBooks(page, limit, search);

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN, Roles.MEMBER]), async (req, res) => {

    try {

        const result = await bookApplication.getBookById(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }


        return res.status(200).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const bookData = req.body;
        const result = await bookApplication.createBook(bookData);

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }
});

router.put('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const result = await bookApplication.updateBook(req.params.id, req.body);

        if (!result.success) {

            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }
});

router.delete('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const result = await bookApplication.deleteBook(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (err) {

        return res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
