import express from 'express'
import { BorrowService } from '../domain/borrow/borrow.service.js';
import { BookService } from '../domain/book/book.service.js';
import { Roles } from '../domain/constants/roles.js';
import { authorize } from '../infrastructure/middlewares/authorize.middleware.js';
import { BorrowApplication } from '../application/borrow.application.js';
import { BorrowRepository } from '../domain/borrow/borrow.repository.js';
import { BorrowValidator } from '../domain/borrow/borrow.validator.js';
import { UserRepository } from '../domain/user/user.repository.js';
import { BookRepository } from '../domain/book/book.repository.js';
import { UserService } from '../domain/user/user.service.js';


const router = express.Router();

const userRepository = new UserRepository()
const bookRepository = new BookRepository();
const borrowRepository = new BorrowRepository();

const borrowValidator = new BorrowValidator();

const borrowService = new BorrowService(borrowRepository, borrowValidator);
const userService = new UserService(userRepository);
const bookService = new BookService(bookRepository);

const borrowApplication = new BorrowApplication(borrowService, userService, bookService);

router.get('/', authorize([Roles.ADMIN, Roles.LIBRARIAN], true), async (req, res) => {

    try {
        const { userId, bookId } = req.query;

        if (userId) {
            const result = await borrowApplication.getBorrowsByUserId(userId);
            return res.json(result);
        }

        if (bookId) {
            const result = await borrowApplication.getBorrowsByBookId(bookId);
            return res.json(result);
        }

        const result = await borrowApplication.getAllBorrows();

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/overdue', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const result = await borrowApplication.getBorrowsWithOverdue();

        if (!result.success) {

            return res.status(400).json(result);
        }

        return res.json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const result = await borrowApplication.getBorrowsById(req.params.id);

        if (!result.success) {

            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }

});

router.post('/', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {
    try {

        const result = await borrowApplication.createBorrow(req.body);

        if (!result.success) {

            return res.status(400).json(result);
        }
        res.status(201).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

router.patch('/:id', authorize([Roles.ADMIN, Roles.LIBRARIAN]), async (req, res) => {

    try {

        const result = await borrowApplication.returnBorrow(req.params.id)

        if (!result.success) {

            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;