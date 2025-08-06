import { pool } from "../../infrastructure/database.js";
import { BorrowStatus } from "../constants/borrow-status.js";
import { BorrowFactory } from "./borrow.factory.js";

export class BorrowRepository {

    async findById(id) {

        const result = await pool.query("SELECT * FROM borrows WHERE id = $1", [id]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async findAll(page, limit) {

        const offset = page * limit;
        const countResult = await pool.query("SELECT COUNT(*) from borrows")
        const totalItems = Number(countResult.rows[0].count)
        const totalPages = Math.ceil(totalItems / limit);

        const result = await pool.query(`
                SELECT
                    b.id, b.book_id, b.user_id, b.borrow_date, b.due_date, b.return_date, b.status,
                    u.id AS user_id, u.name AS user_name, u.surname AS user_surname, u.email AS user_email,
                    bk.id AS book_id, bk.title AS book_title
                FROM borrows b
                LEFT JOIN users u ON b.user_id = u.id
                LEFT JOIN books bk ON b.book_id = bk.id
                ORDER BY b.borrow_date DESC 
                LIMIT $1 OFFSET $2`,
            [limit, offset]);


        if (result.rows.length === 0) {
            return {
                borrows: result.rows.map(row => this._mapToEntity(row)),
                pagination: {
                    totalPages,
                    pageIndex: page,
                    totalItems,
                    itemsPerPage: limit,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            }
        };

        return {
            borrows: result.rows.map(row => this._mapToEntity(row)),
            pagination: {
                totalPages,
                pageIndex: page,
                totalItems,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 0
            }
        }
    }

    async findByUserId(user_id, page, limit) {
        const offset = page * limit;

        const countResult = await pool.query(`
        SELECT COUNT(*) FROM borrows WHERE user_id = $1
    `, [user_id]);

        const totalItems = Number(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);

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
        ORDER BY b.borrow_date DESC
        LIMIT $2 OFFSET $3
    `, [user_id, limit, offset]);

        if (result.rows.length === 0) {
            return {
                borrows: result.rows.map(row => this._mapToEntity(row)),
                pagination: {
                    totalPages,
                    pageIndex: page,
                    totalItems,
                    itemsPerPage: limit,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            }
        };
        return {
            borrows: result.rows.map(row => this._mapToEntity(row)),
            pagination: {
                totalItems,
                pageIndex: page,
                totalPages,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 0
            }
        };
    }

    async findByBookId(book_id, page, limit) {
        const offset = page * limit;

        const countResult = await pool.query(
            "SELECT COUNT(*) FROM borrows WHERE book_id = $1",
            [book_id]);

        const totalItems = Number(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);

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
        WHERE b.book_id = $1
        ORDER BY b.borrow_date DESC
        LIMIT $2 OFFSET $3
    `, [book_id, limit, offset]);

        return {
            borrows: result.rows.map(row => this._mapToEntity(row)),
            pagination: {
                totalItems,
                pageIndex: page,
                totalPages,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 0
            }
        };
    }

    async findAllWithOverdue(page, limit) {
        const offset = page * limit;

        const countResult = await pool.query(
            "SELECT COUNT(*) FROM borrows WHERE status = $1 AND due_date < NOW()",
            [BorrowStatus.BORROWED]
        );

        const totalItems = Number(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);


        const result = await pool.query(`
                SELECT
                    b.id, b.book_id, b.user_id, b.borrow_date, b.due_date, b.return_date, b.status,
                    u.id AS user_id, u.name AS user_name, u.surname AS user_surname, u.email AS user_email,
                    bk.id AS book_id, bk.title AS book_title
                FROM borrows b
                LEFT JOIN users u ON b.user_id = u.id
                LEFT JOIN books bk ON b.book_id = bk.id
                WHERE status = $1 AND due_date < NOW() 
                ORDER BY b.borrow_date DESC
                LIMIT $2 OFFSET $3`,
            [BorrowStatus.BORROWED, limit, offset]
        );

        if (result.rows.length === 0) {
            return {
                borrows: result.rows.map(row => this._mapToEntity(row)),
                pagination: {
                    totalPages,
                    pageIndex: page,
                    totalItems,
                    itemsPerPage: limit,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            }
        };

        return {
            borrows: result.rows.map(row => this._mapToEntity(row)),
            pagination: {
                totalItems,
                pageIndex: page,
                totalPages,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 0
            }
        };
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

    async isBookCurrentlyBorrowed(bookId) {

        const result = await pool.query( //eşleşen ilk kaydı getirmesi yeterli ondan SELECT 1 ... LIMIT 1
            `SELECT 1 FROM borrows
                WHERE book_id = $1 AND status = $2
                LIMIT 1`,
            [bookId, BorrowStatus.BORROWED]
        );

        return result.rowCount > 0;
    }


    _mapToEntity(row) {

        if (row.user_name && row.book_title) {

            return BorrowFactory.fromRowWithJoin(row);
        }
        return BorrowFactory.fromRow(row);
    }
}
