import { BorrowCreateRequestDTO } from "../dtos/borrow/borrow-create.dto.js";
import { BorrowResponseDTO } from "../dtos/borrow/borrow.dto.js";

export class BorrowApplication {

    constructor(borrowService, userService, bookService) {
        this.borrowService = borrowService;
        this.userService = userService;
        this.bookService = bookService;
    }

    async createBorrow(data) {

        const user = await this.userService.getUserById(data.userId);
        if (!user) return { success: false, message: 'User not found' };

        const book = await this.bookService.getBookById(data.bookId);
        if (!book) return { success: false, message: 'Book not found' };

        const dto = new BorrowCreateRequestDTO(data);

        const result = await this.borrowService.createBorrow(dto);

        if (!result.success) {
            return result;
        }

        await this.bookService.updateIsBorrowed(data.bookId, true);

        return {
            success: true,
            message: result.message,
            data: new BorrowResponseDTO(result.data)
        };
    }

    async getBorrowsById(id) {
        const result = await this.borrowService.getBorrowsById(id);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: "Borrow fetched successfully.",
            data: new BorrowResponseDTO(result.data)
        };
    }

    async getAllBorrows(page, limit) {

        const result = await this.borrowService.getAllBorrows(page, limit);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow)),
            pagination: result.pagination
        };
    }

    async getBorrowsByBookId(bookId, page, limit) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) return { success: false, message: "Book not found." };

        const result = await this.borrowService.getBorrowsByBookId(bookId , page, limit);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow)),
            pagination: result.pagination
        };
    }

    async getBorrowsByUserId(userId, page , limit) {

        const user = await this.userService.getUserById(userId);

        if (!user) return { success: false, message: "User not found." };

        const result = await this.borrowService.getBorrowsByUserId(userId, page, limit);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow)),
            pagination: result.pagination
        };
    }

    async getBorrowsWithOverdue(page, limit) {
        const result = await this.borrowService.getBorrowsWithOverdue(page, limit);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow)),
            pagination: result.pagination
        };
    }

    async returnBorrow(id) {
        const result = await this.borrowService.returnBorrow(id);

        if (!result.success) {
            return result;
        }

        const bookId = result.data.bookId;

        await this.bookService.updateIsBorrowed(bookId, false);

        return {
            success: true,
            message: result.message,
            data: new BorrowResponseDTO(result.data)
        };
    }
}
