import { BorrowStatus } from "../constants/borrow-status.js";

export default class Borrow {
  constructor({
    id,
    book_id,
    user_id,
    borrow_date,
    due_date,
    return_date = null,
    status
  }) {
    this.id = id;
    this.book_id = book_id;
    this.user_id = user_id;
    this.borrow_date = borrow_date;
    this.due_date = due_date;
    this.return_date = return_date;
    this.status = status ?? BorrowStatus.BORROWED;
  }

  markReturned(return_date = new Date()) {

    this.return_date = return_date;
    this.status = BorrowStatus.RETURNED;
  }

  isOverdue(current_date = new Date()) {

    return (
      this.status === BorrowStatus.BORROWED && new Date(this.due_date) < current_date
    );
  }
}
