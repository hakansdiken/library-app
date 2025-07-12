import { BookRepository } from './book.repository.js';
import { BookValidator } from './book.validator.js';
import { BookFactory } from './book.factory.js';
import { BookDTO } from './book.dto.js';

export class BookService {
    constructor() {
        this.bookRepository = new BookRepository();
        this.bookValidator = new BookValidator();
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
            data: BookDTO.from(savedBook)
        };
    }

    async getAllBooks() {

        const books = await this.bookRepository.findAll();

        return {
            success: true,
            message: "Books received successfully.",
            data: books.map(book => BookDTO.from(book))
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
            message: "Book received successfully.",
            data: BookDTO.from(book)
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
            data: BookDTO.from(savedBook)
        };
    }

    async deleteBook(id) {

        const book = await this.bookRepository.findById(id);

        if (!book) {
            return { success: false, message: "Book not found!" };
        }

        await this.bookRepository.delete(id);

        return { success: true, message: "Book deleted successfully." };
    }
}
