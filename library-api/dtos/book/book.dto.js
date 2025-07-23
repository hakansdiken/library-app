export class BookResponseDTO {

  constructor({ id, title, author, description, publisher, publicationYear, pageCount, isbn, deweyCode }) {

    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.publisher = publisher;
    this.publicationYear = publicationYear;
    this.pageCount = pageCount;
    this.isbn = isbn;
    this.deweyCode = deweyCode
  }
}