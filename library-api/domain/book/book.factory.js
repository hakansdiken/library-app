import Book from './book.model.js';

export class BookFactory {

    static create(data) {
        return new Book({
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            publicationYear: data.publicationYear,
            pageCount: data.pageCount,
            isbn: data.isbn,
            deweyCode: data.deweyCode,
            description: data.description,
            isBorrowed: data.isBorrowed,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static update(existBook, data) {
        existBook.title = data.title ?? existBook.title;
        existBook.author = data.author ?? existBook.author;
        existBook.publisher = data.publisher ?? existBook.publisher;
        existBook.publicationYear = data.publicationYear ?? existBook.publicationYear;
        existBook.pageCount = data.pageCount ?? existBook.pageCount;
        existBook.isbn = data.isbn ?? existBook.isbn;
        existBook.description = data.description ?? existBook.description;
        existBook.deweyCode = data.deweyCode ?? existBook.deweyCode;
        existBook.updatedAt = new Date();
        existBook.isBorrowed = data.isBorrowed ?? existBook.isBorrowed;

        return existBook;
    }

    static fromRow(row) {
        return new Book({
            id: row.id,
            title: row.title,
            author: row.author,
            publisher: row.publisher,
            publicationYear: row.publication_year,
            pageCount: row.page_count,
            isbn: row.isbn,
            description: row.description,
            deweyCode: row.dewey_code,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            isBorrowed: row.is_borrowed
        });
    }

    static toRow(book) {
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publication_year: book.publicationYear,
            page_count: book.pageCount,
            isbn: book.isbn,
            description: book.description,
            dewey_code: book.deweyCode,
            created_at: book.createdAt,
            updated_at: book.updatedAt,
            is_borrowed: book.isBorrowed
        };
    }
}
