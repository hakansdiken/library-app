import { BorrowStatus } from "../constants/borrow-status.js";

export class BorrowValidator {

    async validateForReturn(data) {

        if (data.status === BorrowStatus.RETURNED) {

            return {
                success: false,
                message: "Borrow  already returned."
            }
        }

        return { success: true }
    }
}