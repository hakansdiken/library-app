export class BorrowUpdateRequestDTO {
    constructor({ returnDate, dueDate }) {
        this.returnDate = returnDate;
        this.dueDate = dueDate;
    }
}