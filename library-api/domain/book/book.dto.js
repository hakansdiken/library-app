export class BookDTO {

  static from(book) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publication_year: book.publication_year,
      page_count: book.page_count,
      isbn: book.isbn,
      dewey_code: book.dewey_code,
      description: book.description
    };
  }
}
