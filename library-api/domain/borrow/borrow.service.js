import { BorrowStatus } from "../constants/borrow-status.js";
import { BorrowDTO } from "./borrow.dto.js";
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
            data: BorrowDTO.from(savedBorrow)
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

    //     return {
    //         success: true,
    //         message: "Borrow updated successfully.",
    //         data: BorrowDTO.from(savedBorrow)
    //     };
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
            message: "Borrow marked as returned.",
            data: BorrowDTO.from(savedBorrow)
        };
    }

    async getAllBorrows() {

        const borrows = await this.borrowRepository.findAll();

        return {
            success: true,
            message: "Borrows received successfully.",
            data: borrows.map(borrow => BorrowDTO.from(borrow))
        };
    }

    async getBorrowsById(id) {

        const borrow = await this.borrowRepository.findById(id);

        return {
            success: true,
            message: "Borrow fetched successfully.",
            data: BorrowDTO.from(borrow)
        };
    }

    async getBorrowsByBookId(bookId) {

        const borrows = await this.borrowRepository.findByBookId(bookId);

        return {
            success: true,
            message: "Borrow fetched successfully.",
            data: borrows.map(borrow => BorrowDTO.from(borrow))
        };
    }

    async getBorrowsByUserId(userId) {

        const borrows = await this.borrowRepository.findByUserId(userId)

        return {
            success: true,
            message: "Borrow fetched successfully.",
            data: borrows.map(borrow => BorrowDTO.from(borrow))
        };
    }
}