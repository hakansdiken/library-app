export class BorrowResponseDTO {

    constructor({ id, bookId, userId, borrowDate, dueDate, returnDate, status, book, user }) {

        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.status = status;

        this.book = book ? {
            id: book.id,
            title: book.title
        } : null;

        this.user = user ? {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email
        } : null;
    }
}
