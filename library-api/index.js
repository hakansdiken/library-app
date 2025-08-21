import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bookController from './api/book.controller.js';
import authController from './api/auth.controller.js';
import userController from './api/user.controller.js';
import borrowController from './api/borrow.controller.js'
import { sessionMiddleware } from './infrastructure/middlewares/session.middleware.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true //cookie gönderimine izin verildi
}
));

app.use(express.json());

app.use(sessionMiddleware);

app.use('/api', authController);
app.use('/api/users', userController)
app.use('/api/books', bookController);
app.use('/api/borrows', borrowController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});