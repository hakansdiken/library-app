export default class Book {
  constructor({
    id,
    title,
    author,
    publisher,
    publication_year,
    page_count,
    isbn,
    dewey_code,
    stock = 0,
    borrowed_count = 0,
    created_at = new Date(),
    updated_at = new Date(),
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.publication_year = publication_year;
    this.page_count = page_count;
    this.isbn = isbn;
    this.dewey_code = dewey_code;
    this.stock = stock;
    this.borrowed_count = borrowed_count;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
