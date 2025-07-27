export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    publisher: string;
    publicationYear: number;
    isbn: string;
    deweyCode: string;
    pageCount: number;
    createdAt: Date;
    updatedAt: Date;
    isBorrowed?: boolean;
}
