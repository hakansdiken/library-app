import { BookCreateRequestDTO } from "../dtos/book/book-create.dto.js";
import { BookUpdateRequestDTO } from "../dtos/book/book-update.dto.js";
import { BookResponseDTO } from "../dtos/book/book.dto.js";

export class BookApplication {

    constructor(bookService) {
        this.bookService = bookService;
    }

    async createBook(data) {

        const dto = new BookCreateRequestDTO(data)
        const result = await this.bookService.createBook(dto);
        
        if (!result.success) {

            return result;
        }

        return {
            success: true,
            message: result.message,
            data: new BookResponseDTO(result.data)
        };
    }

    async getAllBooks() {

        const result = await this.bookService.getAllBooks();

        if (!result.success) {

            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(book => new BookResponseDTO(book))
        };
    }

    async getBookById(id) {

        const result = await this.bookService.getBookById(id);

        if (!result.success) {

            return result;
        }

        return {
            success: true,
            message: result.message,
            data: new BookResponseDTO(result.data)
        };
    }

    async updateBook(id, data) {

        const dto = new BookUpdateRequestDTO(data)
        const result = this.bookService.updateBook(id, dto)

        if (!result.success) {

            return result;
        }

        return {
            success: true,
            message: result.message,
            data: new BookResponseDTO(result.data)
        };
    }

    async deleteBook(id) {

        const result = this.bookService.deleteBook(id)

        return result;
    }
}