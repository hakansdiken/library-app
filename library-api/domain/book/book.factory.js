import Book from './book.model.js';

export class BookFactory {

    static create(data) {

        return new Book({
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            publication_year: data.publication_year,
            page_count: data.page_count,
            isbn: data.isbn,
            dewey_code: data.dewey_code,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static update(book, data) {
        book.title = data.title ?? book.title;
        book.author = data.author ?? book.author;
        book.publisher = data.publisher ?? book.publisher;
        book.publication_year = data.publication_year ?? book.publication_year;
        book.page_count = data.page_count ?? book.page_count;
        book.isbn = data.isbn ?? book.isbn;
        book.dewey_code = data.dewey_code ?? book.dewey_code;
        book.updated_at = new Date();

        return book;
    }

    static fromRow(row) {
        return new Book({
            id: row.id,
            title: row.title,
            author: row.author,
            publisher: row.publisher,
            publication_year: row.publication_year,
            page_count: row.page_count,
            isbn: row.isbn,
            dewey_code: row.dewey_code,
            created_at: row.created_at,
            updated_at: row.updated_at
        });
    }
}
