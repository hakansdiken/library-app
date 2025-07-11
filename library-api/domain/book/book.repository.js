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

        return result.rows.map(row => this._mapToEntity(row));
    }

    async save(book) {

        if (!book.id) {

            const result = await pool.query(
                `INSERT INTO books 
         (title, author, publisher, publication_year, page_count, isbn, dewey_code, created_at ,updated_at) 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
                [
                    book.title,
                    book.author,
                    book.publisher,
                    book.publication_year,
                    book.page_count,
                    book.isbn,
                    book.dewey_code,
                    book.created_at,
                    book.updated_at
                ]
            );

            return this._mapToEntity(result.rows[0]);

        } else {

            const result = await pool.query(
                `UPDATE books SET 
           title = $1, author = $2, publisher = $3, publication_year = $4,
           page_count = $5, isbn = $6, dewey_code = $7, updated_at = $8
         WHERE id = $9 RETURNING *`,
                [
                    book.title,
                    book.author,
                    book.publisher,
                    book.publication_year,
                    book.page_count,
                    book.isbn,
                    book.dewey_code,
                    book.updated_at,
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
