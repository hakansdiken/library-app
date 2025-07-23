export class BorrowCreateRequestDTO {
  constructor({ userId, bookId, borrowDate, dueDate }) {
    this.userId = userId;
    this.bookId = bookId;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;
  }
}