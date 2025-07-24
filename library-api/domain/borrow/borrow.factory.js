import { BorrowStatus } from "../constants/borrow-status.js";
import Borrow from "./borrow.model.js"

export class BorrowFactory {

    static create(data) {
        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(borrowDate.getDate() + 14);

        return new Borrow({
            bookId: data.bookId,
            userId: data.userId,
            borrowDate: borrowDate,
            dueDate: dueDate,
            returnDate: null,
            status: BorrowStatus.BORROWED
        });
    }

    static update(existBorrow, data) {
        existBorrow.returnDate = data.returnDate ?? existBorrow.returnDate;
        existBorrow.status = data.status ?? existBorrow.status;
        existBorrow.dueDate = data.dueDate ?? existBorrow.dueDate;

        return existBorrow;
    }

    static fromRow(row) {
        return new Borrow({
            id: row.id,
            bookId: row.book_id,
            userId: row.user_id,
            borrowDate: row.borrow_date,
            dueDate: row.due_date,
            returnDate: row.return_date,
            status: row.status
        });
    }

    static toRow(borrow) {
        return {
            id: borrow.id,
            book_id: borrow.bookId,
            user_id: borrow.userId,
            borrow_date: borrow.borrowDate,
            due_date: borrow.dueDate,
            return_date: borrow.returnDate,
            status: borrow.status
        };
    }
}
