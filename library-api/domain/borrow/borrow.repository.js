import { pool } from "../../infrastructure/database.js";
import { BorrowFactory } from "./borrow.factory.js";

export class BorrowRepository {

    async findById(id) {

        const result = await pool.query("SELECT * FROM borrows WHERE id = $1", [id]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async findAll() {

        const result = await pool.query(`
            SELECT
                b.id, b.book_id, b.user_id, b.borrow_date, b.due_date, b.return_date, b.status,
                u.id AS user_id, u.name AS user_name, u.surname AS user_surname, u.email AS user_email,
                bk.id AS book_id, bk.title AS book_title
                FROM borrows b
                JOIN users u ON b.user_id = u.id
                JOIN books bk ON b.book_id = bk.id
                ORDER BY b.borrow_date DESC`
        );

        if (result.rows.length === 0) return [];

        return result.rows.map(row => this._mapToEntity(row));
    }

    async findByUserId(user_id) {

        const result = await pool.query(`
            SELECT 
                b.*, 
                u.id AS user_id,
                u.name AS user_name,
                u.surname AS user_surname,
                u.email AS user_email,
                bk.id AS book_id,
                bk.title AS book_title
            FROM borrows b
            JOIN users u ON b.user_id = u.id
            JOIN books bk ON b.book_id = bk.id
            WHERE b.user_id = $1
            ORDER BY b.borrow_date DESC`, [user_id]);


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

        if (row.user_name && row.book_title) {

            return BorrowFactory.fromRowWithJoin(row);
        }
        return BorrowFactory.fromRow(row);
    }
}
