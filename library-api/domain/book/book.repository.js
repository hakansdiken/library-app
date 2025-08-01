import { pool } from "../../infrastructure/database.js";
import { BookFactory } from "./book.factory.js";

export class BookRepository {

    async findById(id) {

        const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async findAll() {

        const result = await pool.query("SELECT * FROM books ORDER BY created_at DESC");

        if (result.rows.length === 0) return [];

        return result.rows.map(row => this._mapToEntity(row));
    }

    async save(book) {

        const row = BookFactory.toRow(book);

        if (!book.id) {

            const result = await pool.query(
                `INSERT INTO books (
                    title, author, publisher, publication_year, page_count, isbn, dewey_code, description, updated_at, created_at, is_borrowed) 
                    VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
                    ) RETURNING *`,
                [
                    row.title,
                    row.author,
                    row.publisher,
                    row.publication_year,
                    row.page_count,
                    row.isbn,
                    row.dewey_code,
                    row.description,
                    row.updated_at,
                    row.created_at,
                    row.is_borrowed
                ]
            );

            return this._mapToEntity(result.rows[0]);

        } else {
            const result = await pool.query(
                `UPDATE books SET 
                    title = $1, 
                    author = $2, 
                    publisher = $3, 
                    publication_year = $4,
                    page_count = $5, 
                    isbn = $6, 
                    dewey_code = $7,
                    description = $8, 
                    updated_at = $9,
                    is_borrowed = $10
                    WHERE id = $11
                    RETURNING *`,
                [
                    row.title,
                    row.author,
                    row.publisher,
                    row.publication_year,
                    row.page_count,
                    row.isbn,
                    row.dewey_code,
                    row.description,
                    row.updated_at,
                    row.is_borrowed,
                    book.id,
                ]
            );

            return this._mapToEntity(result.rows[0]);
        }
    }

    async delete(id) {

        await pool.query("DELETE FROM books WHERE id = $1", [id]);
    }

    _mapToEntity(row) {

        return BookFactory.fromRow(row);
    }
}
