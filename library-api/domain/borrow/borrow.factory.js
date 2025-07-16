import { BorrowStatus } from "../constants/borrow-status.js";
import Borrow from "./borrow.model.js"

export class BorrowFactory {

    static create(data) {
        const borrowDate = new Date();

        const dueDate = new Date();
        dueDate.setDate(borrowDate.getDate() + 14);

        return new Borrow({
            book_id: data.bookId,
            user_id: data.userId,
            borrow_date: borrowDate,
            due_date: dueDate,
            return_date: null,
            status: BorrowStatus.BORROWED
        });
    }

    static update(existBorrow, data) {

        existBorrow.return_date = data.returnDate ?? existBorrow.return_date;
        existBorrow.status = data.status ?? existBorrow.status
        existBorrow.due_date = data.dueDate ?? existBorrow.due_date

        return existBorrow;
    }

    static fromRow(row) {

        return new Borrow({
            id: row.id,
            book_id: row.book_id,
            user_id: row.user_id,
            borrow_date: row.borrow_date,
            due_date: row.due_date,
            return_date: row.return_date,
            status: row.status
        });

    }
}