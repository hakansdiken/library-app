import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bookController from './presentation/book.controller.js';
import authController from './presentation/auth.controller.js';
import userController from './presentation/user.controller.js';
import { sessionMiddleware } from './infrastructure/middlewares/session.middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(sessionMiddleware);

app.use('/api', authController);
app.use('/api/users', userController)
app.use('/api/books', bookController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});