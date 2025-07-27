export default class Book {
  constructor({
    id,
    title,
    author,
    publisher,
    publicationYear,
    pageCount,
    isbn,
    deweyCode,
    description,
    isBorrowed = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.publicationYear = publicationYear;
    this.pageCount = pageCount;
    this.isbn = isbn;
    this.deweyCode = deweyCode;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isBorrowed = isBorrowed;
  }
}
