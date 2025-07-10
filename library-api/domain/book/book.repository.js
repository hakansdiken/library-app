import Book from "./book.model.js";
import { pool } from "../../infrastructure/database.js";
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
         (title, author, publisher, publication_year, page_count, isbn, dewey_code, stock, borrowed_count, created_at ,updated_at) 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
                [
                    book.title,
                    book.author,
                    book.publisher,
                    book.publication_year,
                    book.page_count,
                    book.isbn,
                    book.dewey_code,
                    book.stock,
                    book.borrowed_count,
                    book.created_at,
                    book.updated_at
                ]
            );

            return this._mapToEntity(result.rows[0]);

        } else {

            const result = await pool.query(
                `UPDATE books SET 
           title = $1, author = $2, publisher = $3, publication_year = $4,
           page_count = $5, isbn = $6, dewey_code = $7, stock = $8, borrowed_count = $9, updated_at = $10
         WHERE id = $11 RETURNING *`,
                [
                    book.title,
                    book.author,
                    book.publisher,
                    book.publication_year,
                    book.page_count,
                    book.isbn,
                    book.dewey_code,
                    book.stock,
                    book.borrowed_count,
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
        return new Book({
            id: row.id,
            title: row.title,
            author: row.author,
            publisher: row.publisher,
            publication_year: row.publication_year,
            page_count: row.page_count,
            isbn: row.isbn,
            dewey_code: row.dewey_code,
            stock: row.stock,
            borrowed_count: row.borrowed_count,
            created_at: row.created_at,
            updated_at: row.updated_at
        });
    }
}
