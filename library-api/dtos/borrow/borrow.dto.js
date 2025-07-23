export class BorrowResponseDTO {

    constructor({ id, bookId, userId, borrowDate, dueDate, returnDate, status }) {

        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.status = status;
    }
}