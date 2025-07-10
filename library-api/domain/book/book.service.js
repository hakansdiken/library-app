import { BookRepository } from './book.repository.js';
import Book from '../../domain/book/book.model.js';
import { BookValidator } from './book.validator.js';

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

        const book = new Book({
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            publication_year: data.publication_year,
            page_count: data.page_count,
            isbn: data.isbn,
            dewey_code: data.dewey_code,
            created_at: new Date(),
            updated_at: new Date()
        });

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
            message: "Books received successfully.",
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
            message: "Book received successfully.",
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

        book.title = data.title ?? book.title;
        book.author = data.author ?? book.author;
        book.publisher = data.publisher ?? book.publisher;
        book.publication_year = data.publication_year ?? book.publication_year;
        book.page_count = data.page_count ?? book.page_count;
        book.isbn = data.isbn ?? book.isbn;
        book.dewey_code = data.dewey_code ?? book.dewey_code;
        book.updated_at = new Date();

        const updatedBook = await this.bookRepository.save(book);

        return {
            success: true,
            message: "Book updated successfully.",
            data: updatedBook
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
