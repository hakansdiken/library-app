import { BorrowStatus } from "../constants/borrow-status.js";

export default class Borrow {
  constructor({
    id,
    bookId,
    userId,
    borrowDate,
    dueDate,
    returnDate = null,
    status
  }) {
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
    this.status = status ?? BorrowStatus.BORROWED;
  }

  markReturned(returnDate = new Date()) {
    
    this.returnDate = returnDate;
    this.status = BorrowStatus.RETURNED;
  }

  isOverdue(currentDate = new Date()) {

    return (
      this.status === BorrowStatus.BORROWED && new Date(this.dueDate) < currentDate
    );
  }
}
