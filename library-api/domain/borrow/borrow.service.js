import { BorrowStatus } from "../constants/borrow-status.js";
import { BorrowFactory } from "./borrow.factory.js";

export class BorrowService {

    constructor(borrowRepository, borrowValidator) {
        this.borrowRepository = borrowRepository;
        this.borrowValidator = borrowValidator;
    }

    async createBorrow(data) {

        const existBorrows = await this.borrowRepository.findByBookId(data.bookId);

        const isBorrowed = existBorrows.some(borrow => borrow.status === BorrowStatus.BORROWED);

        if (isBorrowed) {
            return {
                success: false,
                message: "This book already borrowed."
            }
        }

        const borrow = BorrowFactory.create(data);

        const savedBorrow = await this.borrowRepository.save(borrow);


        return {
            success: true,
            message: "Borrow created successfully.",
            data: savedBorrow
        }
    }

    // async updateBorrow(id, data) {

    //     const borrow = await this.borrowRepository.findById(id);

    //     if (!borrow) {

    //         return {
    //             success: false,
    //             message: "Borrow not found!"
    //         };
    //     }

    //     const updatedBorrow = await BorrowFactory.update(borrow, data);

    //     const savedBorrow = await this.borrowRepository.save(updatedBorrow);

    // return {
    //     success: false,
    //     message: "This book already borrowed.",
    //     data: savedBorrow
    // }
    // }

    async returnBorrow(id) {

        const borrow = await this.borrowRepository.findById(id);
        const validation = await this.borrowValidator.validateForReturn(borrow);

        if (!validation.success) {

            return validation;
        }

        if (!borrow) {

            return {
                success: false,
                message: "Borrow not found!"
            };
        }

        borrow.markReturned();

        const savedBorrow = await this.borrowRepository.save(borrow);

        return {
            success: true,
            message: "Borrow marked 'returned' succesfully",
            data: savedBorrow
        }
    }

    async getAllBorrows(page, limit) {

        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
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

        const data = await this.borrowRepository.findAll(page, limit);

        return {
            success: true,
            message: "Borrows fetched succesfully.",
            data: data.borrows,
            pagination: data.pagination
        }
    }

    async getBorrowsById(id) {

        const borrow = await this.borrowRepository.findById(id);

        return {
            success: true,
            message: "Borrow fetched succesfully.",
            data: borrow
        }
    }

    async getBorrowsByBookId(bookId, page, limit) {

        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
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

        const data = await this.borrowRepository.findByBookId(bookId, page, limit);

        return {
            success: true,
            message: "Borrows fetched succesfully.",
            data: data.borrows,
            pagination: data.pagination
        }
    }

    async getBorrowsByUserId(userId, page, limit) {


        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
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

        const data = await this.borrowRepository.findByUserId(userId, page, limit);

        return {
            success: true,
            message: "Borrows fetched succesfully.",
            data: data.borrows,
            pagination: data.pagination
        }
    }

    async getBorrowsWithOverdue(page, limit) {

        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
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

        const data = await this.borrowRepository.findAllWithOverdue(page, limit);

        return {
            success: true,
            message: "Overdue borrows fetched succesfully.",
            data: data.borrows,
            pagination: data.pagination
        }
    }
}