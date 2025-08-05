import { BookFactory } from './book.factory.js';

export class BookService {
    constructor(bookRepository, bookValidator) {
        this.bookRepository = bookRepository;
        this.bookValidator = bookValidator;
    }

    async createBook(data) {

        const validation = this.bookValidator.validateForCreate(data);

        if (!validation.success) {

            return validation;
        }


        const book = BookFactory.create(data);

        const savedBook = await this.bookRepository.save(book);

        return {
            success: true,
            message: "Book created successfully.",
            data: savedBook,
        };
    }

    async getAllBooks(page, limit) {

        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 0) {
            return {
                success: false,
                message: "Page number must be a positive integer."
            };
        }

        if (isNaN(limit) || limit < 1) {
            return {
                success: false,
                message: "Limit must be a positive integer."
            };
        }

        const data = await this.bookRepository.findAll(page, limit);

        return {
            success: true,
            message: "Books fetched successfully.",
            data: data.books,
            pagination: data.pagination
        };
    }

    async getBookById(id) {

        const book = await this.bookRepository.findById(id);

        if (!book) {

            return {
                success: false,
                message: "Book not found!"
            };
        }

        return {
            success: true,
            message: "Book fetched successfully.",
            data: book
        };
    }

    async updateBook(id, data) {

        const book = await this.bookRepository.findById(id);

        if (!book) {
            return {
                success: false,
                message: "Book not found!"
            };
        }

        const validation = this.bookValidator.validateForUpdate(data);

        if (!validation.success) {

            return validation;
        }

        const updateBook = BookFactory.update(book, data)
        const savedBook = await this.bookRepository.save(updateBook);

        return {
            success: true,
            message: "Book updated successfully.",
            data: savedBook
        };
    }

    async updateIsBorrowed(bookId, isBorrowed) {

        const book = await this.bookRepository.findById(bookId);

        if (!book) {
            return {
                success: false,
                message: "Book not found!"
            };
        }

        book.isBorrowed = isBorrowed;
        
        const savedBook = await this.bookRepository.save(book);

        return {
            success: true,
            message: "Book status updated successfully.",
            data: savedBook
        };
    }

    async deleteBook(id) {

        const book = await this.bookRepository.findById(id);

        if (!book) {

            return {
                success: false,
                message: "Book not found!"
            };
        }

        const result = await this.bookRepository.delete(id);

        if (!result.success) {

            return {
                success: false,
                message: "This book currently borrowed",
            }
        }

        return {
            success: true,
            message: "Book deleted successfully."
        };
    }
}
