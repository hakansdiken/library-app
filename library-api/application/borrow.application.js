import { BookRepository } from "../domain/book/book.repository.js";
import { UserRepository } from "../domain/user/user.repository.js";

export class BorrowApplication {

    constructor(borrowRepository, borrowService) {
        this.borrowRepository = borrowRepository;
        this.borrowService = borrowService;
        this.userRepository = new UserRepository();
        this.bookRepository = new BookRepository();
    }

    async createBorrow(data) {

        const user = await this.userRepository.findById(data.userId);
        if (!user) return { success: false, message: 'User not found' };

        const book = await this.bookRepository.findById(data.bookId);
        if (!book) return { success: false, message: 'Book not found' };

        const result = await this.borrowService.createBorrow(data);

        return result;
    }

    async getBorrowsByBookId(bookId) {

        const book = await this.bookRepository.findById(bookId);

        if (!book) return { success: false, message: "Book not found" };

        const result = await this.borrowService.getBorrowsByBookId(bookId);

        return result;
    }

    async getBorrowsByUserId(userId) {

        const user = await this.userRepository.findById(userId);

        if (!user) return { success: false, message: "User not found" };

        const result = await this.borrowService.getBorrowsByUserId(userId);

        return result;
    }
}