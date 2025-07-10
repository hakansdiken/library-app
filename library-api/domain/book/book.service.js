import { BookRepository } from './book.repository.js';
import Book from '../../domain/book/book.model.js'

export class BookService {

    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(data) {
        
        try {
            const book = new Book({
                title: data.title,
                author: data.author,
                publisher: data.publisher,
                publication_year: data.publication_year,
                page_count: data.page_count,
                isbn: data.isbn,
                dewey_code: data.dewey_code,
                stock: data.stock ?? 0,
                borrowed_count: 0,
                created_at: new Date(),
                updated_at: new Date()
            });

            const savedBook = await this.bookRepository.save(book);

            return {
                success: true,
                message: "Book created successfully.",
                data: savedBook
            };
        } catch (error) {
            return {
                success: false,
                message: "An error occurred while creating the book.",
                error: error.message
            };
        }
    }

    async getAllBooks() {

        try {

            const books = await this.bookRepository.findAll();

            return {
                success: true,
                message: "Books received successfully",
                data: books
            };
        } catch (error) {

            return {
                success: false,
                message: "Failed to receive books!",
                error: error.message
            };
        }
    }

    async getBookById(id) {

        try {

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

        } catch (error) {

            return {
                success: false,
                message: "Failed to receive book.",
                error: error.message
            };
        }
    }

    async updateBook(id, data) {

        try {
            const book = await this.bookRepository.findById(id);

            if (!book) {

                return { success: false, message: "Book not found!" };
            }

            book.author = data.author ?? book.author;
            book.title = data.title ?? book.title;
            book.publication_year = data.publication_year ?? book.publication_year;
            book.isbn = data.isbn ?? book.isbn;
            book.page_count = data.page_count ?? book.page_count;
            book.publisher = data.publisher ?? book.publisher;
            book.updated_at = new Date();

            const updatedBook = await this.bookRepository.save(book);

            return {
                success: true,
                message: "Book updated successfully.",
                data: updatedBook
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to update book!",
                error: error.message,
            }
        }


    }


    async deleteBook(id) {
        try {

            const book = await this.bookRepository.findById(id);

            if (!book) {

                return { success: false, message: "Book not found!" };
            }

            await this.bookRepository.delete(id);

            return { success: true, message: "Book deleted successfully." };

        } catch (error) {

            return {
                success: false,
                message: "Failed to delete book!"
            }
        }
    }
}