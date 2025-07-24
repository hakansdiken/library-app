import { pool } from "../../infrastructure/database.js";
import { BorrowFactory } from "./borrow.factory.js";

export class BorrowRepository {

    async findById(id) {

        const result = await pool.query("SELECT * FROM borrows WHERE id = $1", [id]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async findAll() {

        const result = await pool.query("SELECT * FROM borrows ORDER BY borrow_date DESC");

        if (result.rows.length === 0) return [];

        return result.rows.map(row => this._mapToEntity(row));
    }

    async findByUserId(user_id) {

        const result = await pool.query("SELECT * FROM borrows WHERE user_id = $1", [user_id]);

        if (result.rows.length === 0) return [];

        return result.rows.map(row => this._mapToEntity(row));
    }

    async findByBookId(book_id) {

        const result = await pool.query("SELECT * FROM borrows WHERE book_id = $1", [book_id]);

        if (result.rows.length === 0) return [];

        return result.rows.map(row => this._mapToEntity(row));
    }

    async findAllWithOverdue() {

        const result = await pool.query("SELECT * FROM borrows WHERE status = $1 AND due_date < NOW()", ["borrowed"]);

        if (result.rows.length === 0) return [];

        return result.rows.map(row => this._mapToEntity(row));
    }

    async save(borrow) {
        const row = BorrowFactory.toRow(borrow);

        if (!borrow.id) {
            const result = await pool.query(
                `INSERT INTO borrows (
                    book_id, user_id, borrow_date, due_date, return_date, status
                ) VALUES (
                    $1, $2, $3, $4, $5, $6
                ) RETURNING *`,
                [
                    row.book_id,
                    row.user_id,
                    row.borrow_date,
                    row.due_date,
                    row.return_date,
                    row.status
                ]
            );
            return this._mapToEntity(result.rows[0]);

        } else {

            const result = await pool.query(
                `UPDATE borrows SET 
                    book_id = $1, 
                    user_id = $2, 
                    borrow_date = $3, 
                    due_date = $4, 
                    return_date = $5, 
                    status = $6 
                    WHERE id = $7 
                    RETURNING *`,
                [
                    row.book_id,
                    row.user_id,
                    row.borrow_date,
                    row.due_date,
                    row.return_date,
                    row.status,
                    borrow.id
                ]
            );
            return this._mapToEntity(result.rows[0]);
        }
    }

    async delete(id) {

        await pool.query("DELETE FROM borrows WHERE id = $1", [id]);
    }

    _mapToEntity(row) {

        return BorrowFactory.fromRow(row);
    }
}
