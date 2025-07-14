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
    description,
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
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.description = description;
  }
}
