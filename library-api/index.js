import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bookController from './presentation/book.controller.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/books', bookController)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})