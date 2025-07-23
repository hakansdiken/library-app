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

    async getAllBorrows() {
        const result = await this.borrowService.getAllBorrows();

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow))
        };
    }

    async getBorrowsByBookId(bookId) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) return { success: false, message: "Book not found." };

        const result = await this.borrowService.getBorrowsByBookId(bookId);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow))
        };
    }

    async getBorrowsByUserId(userId) {
        const user = await this.userService.getUserById(userId);

        if (!user) return { success: false, message: "User not found." };

        const result = await this.borrowService.getBorrowsByUserId(userId);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow))
        };
    }

    async getBorrowsWithOverdue() {
        const result = await this.borrowService.getBorrowsWithOverdue();

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: result.data.map(borrow => new BorrowResponseDTO(borrow))
        };
    }

    async returnBorrow(id) {
        const result = await this.borrowService.returnBorrow(id);

        if (!result.success) {
            return result;
        }
        
        return {
            success: true,
            message: result.message,
            data: new BorrowResponseDTO(result.data)
        };
    }
}
