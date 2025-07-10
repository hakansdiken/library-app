import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bookController from './presentation/book.controller.js';
import authController from './presentation/auth.controller.js';
import { sessionMiddleware } from './infrastructure/middlewares/session.middleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(sessionMiddleware);
app.use('/api/', authController);
app.use('/api/books', bookController);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})