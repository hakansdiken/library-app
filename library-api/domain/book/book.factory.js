import Book from './book.model.js';

export class BookFactory {

    static create(data) {
        return new Book({
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            publication_year: data.publicationYear, 
            page_count: data.pageCount,
            isbn: data.isbn,
            dewey_code: data.deweyCode,
            description: data.description,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static update(existBook, data) {
        existBook.title = data.title ?? existBook.title;
        existBook.author = data.author ?? existBook.author;
        existBook.publisher = data.publisher ?? existBook.publisher;
        existBook.publication_year = data.publicationYear ?? existBook.publication_year;
        existBook.page_count = data.pageCount ?? existBook.page_count;
        existBook.isbn = data.isbn ?? existBook.isbn;
        existBook.description = data.description ?? existBook.description;
        existBook.dewey_code = data.deweyCode ?? existBook.dewey_code;
        existBook.updated_at = new Date();

        return existBook;
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
            description: row.description,
            dewey_code: row.dewey_code,
            created_at: row.created_at,
            updated_at: row.updated_at
        });
    }
}
