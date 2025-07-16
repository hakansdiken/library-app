export class BookDTO {

  static from(book) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publicationYear: book.publication_year,
      pageCount: book.page_count,
      isbn: book.isbn,
      deweyCode: book.dewey_code,
      description: book.description
    };
  }
}
