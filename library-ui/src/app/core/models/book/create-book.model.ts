export interface CreateBook {
  title: string;
  author: string;
  description?: string;
  publisher: string;
  publicationYear: number;
  isbn: string;
  deweyCode: string;
  pageCount: number;
  isBorrowed?: boolean;
}