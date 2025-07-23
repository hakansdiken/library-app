export class BookValidator {
  validateForCreate(data) {
    // required control
    if (!data.title) {
      return { success: false, message: "Title is required." };
    }
    if (!data.author) {
      return { success: false, message: "Author is required." };
    }
    if (!data.publisher) {
      return { success: false, message: "Publisher is required." };
    }
    if (data.pageCount === undefined || data.pageCount === null) {
      return { success: false, message: "Page count is required." };
    }
    if (!data.isbn) {
      return { success: false, message: "ISBN is required." };
    }
    if (!data.deweyCode) {
      return { success: false, message: "Dewey code is required." };
    }
    if (data.publicationYear === undefined || data.publicationYear === null) {
      return { success: false, message: "Publication year is required." };
    }

    // type control
    if (typeof data.title !== 'string') {
      return { success: false, message: "Title must be a string." };
    }
    if (typeof data.author !== 'string') {
      return { success: false, message: "Author must be a string." };
    }
    if (typeof data.description !== 'string') {
      return { success: false, message: "Description must be a string." };
    }
    if (typeof data.publisher !== 'string') {
      return { success: false, message: "Publisher must be a string." };
    }
    if (typeof data.publicationYear !== 'number') {
      return { success: false, message: "Publication year must be a number." };
    }
    if (typeof data.pageCount !== 'number') {
      return { success: false, message: "Page count must be a number." };
    }
    if (typeof data.isbn !== 'string') {
      return { success: false, message: "ISBN must be a string." };
    }
    if (typeof data.deweyCode !== 'string') {
      return { success: false, message: "Dewey code must be a string." };
    }
    if (data.pageCount <= 0) {
      return { success: false, message: "Page count must be a positive number." };
    }
    
    const currentYear = new Date().getFullYear();
    if (data.publicationYear > currentYear) {
      return { success: false, message: "Publication year cannot be in the future." };
    }

    return { success: true };
  }

  validateForUpdate(data) {
    
    if (data.title && typeof data.title !== 'string') {
      return { success: false, message: "Title must be a string." };
    }
    if (data.author && typeof data.author !== 'string') {
      return { success: false, message: "Author must be a string." };
    }
    if (data.description && typeof data.description !== 'string') {
      return { success: false, message: "Description must be a string." };
    }
    if (data.publisher && typeof data.publisher !== 'string') {
      return { success: false, message: "Publisher must be a string." };
    }
    if (data.publicationYear && typeof data.publicationYear !== 'number') {
      return { success: false, message: "Publication year must be a number." };
    }
    if (data.pageCount && typeof data.pageCount !== 'number') {
      return { success: false, message: "Page count must be a number." };
    }
    if (data.isbn && typeof data.isbn !== 'string') {
      return { success: false, message: "ISBN must be a string." };
    }
    if (data.deweyCode && typeof data.deweyCode !== 'string') {
      return { success: false, message: "Dewey code must be a string." };
    }
    if (data.pageCount <= 0) {
      return { success: false, message: "Page count must be a positive number." };
    }

    const currentYear = new Date().getFullYear();
    if (data.publicationYear > currentYear) {
      return { success: false, message: "Publication year cannot be in the future." };
    }

    return { success: true };
  }
}
