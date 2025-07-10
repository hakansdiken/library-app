export class BookValidator {
    validateForCreate(data) {
        //required control
        if (!data.title) {
            return { success: false, message: "Title is required." };
        }
        if (!data.author) {
            return { success: false, message: "Author is required." };
        }
        if (!data.publisher) {
            return { success: false, message: "Publisher is required." };
        }
        if (data.page_count === undefined || data.page_count === null) {
            return { success: false, message: "Page count is required." };
        }
        if (!data.isbn) {
            return { success: false, message: "ISBN is required." };
        }
        if (!data.dewey_code) {
            return { success: false, message: "Dewey code is required." };
        }
        if (data.publication_year === undefined || data.publication_year === null) {
            return { success: false, message: "Publication year is required." };
        }

        // type control
        if (typeof data.title !== 'string') {
            return { success: false, message: "Title must be a string." };
        }
        if (typeof data.author !== 'string') {
            return { success: false, message: "Author must be a string." };
        }
        if (typeof data.publisher !== 'string') {
            return { success: false, message: "Publisher must be a string." };
        }
        if (typeof data.publication_year !== 'number') {
            return { success: false, message: "Publication year must be a number." };
        }
        if (typeof data.page_count !== 'number') {
            return { success: false, message: "Page count must be a number." };
        }
        if (typeof data.isbn !== 'string') {
            return { success: false, message: "ISBN must be a string." };
        }
        if (typeof data.dewey_code !== 'string') {
            return { success: false, message: "Dewey code must be a string." };
        }

        const currentYear = new Date().getFullYear();
        if (data.publication_year > currentYear) {
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
        if (data.publisher && typeof data.publisher !== 'string') {
            return { success: false, message: "Publisher must be a string." };
        }
        if (data.publication_year && typeof data.publication_year !== 'number') {
            return { success: false, message: "Publication year must be a number." };
        }
        if (data.page_count && typeof data.page_count !== 'number') {
            return { success: false, message: "Page count must be a number." };
        }
        if (data.isbn && typeof data.isbn !== 'string') {
            return { success: false, message: "ISBN must be a string." };
        }
        if (data.dewey_code && typeof data.dewey_code !== 'string') {
            return { success: false, message: "Dewey code must be a string." };
        }

        const currentYear = new Date().getFullYear();
        if (data.publication_year > currentYear) {
            return { success: false, message: "Publication year cannot be in the future." };
        }

        return { success: true };
    }
}
