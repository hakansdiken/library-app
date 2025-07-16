export class BorrowDTO {
    static from(borrow) {
        return {
            id: borrow.id,
            bookId: borrow.book_id,
            userId: borrow.user_id,
            borrowDate: borrow.borrow_date,
            dueDate: borrow.due_date,
            returnDate: borrow.return_date,
            status: borrow.status
        }
    }
}
