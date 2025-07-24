import { BorrowStatus } from "../enums/borrow-status.enum";

export interface Borrow {
    id: string;
    userId: string;
    bookId: string;
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    status: BorrowStatus;
}