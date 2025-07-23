import { BookFactory } from './book.factory.js';

export class BookService {
    constructor(bookRepository, bookValidator) {
        this.bookRepository = bookRepository;
        this.bookValidator = bookValidator;
    }

    async createBook(data) {
        
        console.log("data:" + data)
        const validation = this.bookValidator.validateForCreate(data);

        if (!validation.success) {

            return validation;
        }


        const book = BookFactory.create(data);

        const savedBook = await this.bookRepository.save(book);

        return {
            success: true,
            message: "Book created successfully.",
            data: savedBook
        };
    }

    async getAllBooks() {

        const books = await this.bookRepository.findAll();

        return {
            success: true,
            message: "Books fetched successfully.",
            data: books
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

    async deleteBook(id) {

        const book = await this.bookRepository.findById(id);

        if (!book) {

            return {
                success: false,
                message: "Book not found!"
            };
        }

        await this.bookRepository.delete(id);

        return {
            success: true,
            message: "Book deleted successfully."
        };
    }
}
