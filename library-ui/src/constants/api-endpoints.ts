const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
    ME: `${API_BASE_URL}/me`
  },
  USERS: {
    ROOT: (page?: number, limit?: number, search?: string) => `${API_BASE_URL}/users?page=${page}&limit=${limit}&search=${search}`,
    BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
    CREATE: `${API_BASE_URL}/users/`,
    EDIT: (id: string) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/users/${id}`
  },
  BOOKS: {
    ROOT: (page?: number, limit?: number, search?: string) => `${API_BASE_URL}/books?page=${page}&limit=${limit}&search=${search}`,
    BY_ID: (id: string) => `${API_BASE_URL}/books/${id}`,
    CREATE: `${API_BASE_URL}/books`,
    EDIT: (id: string) => `${API_BASE_URL}/books/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/books/${id}`
  },
  BORROWS: {
    ROOT: (page?: number, limit?: number, search?: string) => `${API_BASE_URL}/borrows?page=${page}&limit=${limit}&search=${search}`,
    BY_ID: (id: string) => `${API_BASE_URL}/borrows/${id}`,
    BY_BOOKID: (bookId: string, page?: number, limit?: number, search?: string) => `${API_BASE_URL}/borrows?bookId=${bookId}&page=${page}&limit=${limit}&search=${search}`,
    BY_USERID: (userId: string, page?: number, limit?: number, search?: string) => `${API_BASE_URL}/borrows?userId=${userId}&page=${page}&limit=${limit}&search=${search}`,
    OVERDUE: (page?: number, limit?: number, search?: string) => `${API_BASE_URL}/borrows/overdue?page=${page}&limit=${limit}&search=${search}`,
    CREATE: `${API_BASE_URL}/borrows`,
    EDIT: (id: string) => `${API_BASE_URL}/borrows/${id}`,
    RETURN: (id: string) => `${API_BASE_URL}/borrows/${id}`
  },
};
