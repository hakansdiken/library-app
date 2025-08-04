export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    pagination?: {
        totalItems: number,
        pageIndex: number,
        totalPages: number,
        itemsPerPage: number,
        hasNextPage: boolean,
        hasPrevPage: boolean
    }
}