const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
    ME: `${API_BASE_URL}/me`
  },
  USERS: {
    ROOT: `${API_BASE_URL}/users`,
    BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
    CREATE: `${API_BASE_URL}/users/`,
    EDIT: (id: string) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/users/${id}`
  },
  BOOKS: {
    ROOT: `${API_BASE_URL}/books`,
    BY_ID: (id: string) => `${API_BASE_URL}/books/${id}`,
    CREATE: `${API_BASE_URL}/books`,
    EDIT: (id: string) => `${API_BASE_URL}/books/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/books/${id}`
  },
  BORROWS: {
    ROOT: `${API_BASE_URL}/borrows`,
    BY_ID: (id: string) => `${API_BASE_URL}/borrows/${id}`,
    BY_BOOKID: (bookId: string) => `${API_BASE_URL}/borrows?bookId=${bookId}`,
    BY_USERID: (userId: string) => `${API_BASE_URL}/borrows?userId=${userId}`,
    CREATE: `${API_BASE_URL}/borrows`,
    EDIT: (id: string) => `${API_BASE_URL}/borrows/${id}`,
    RETURN: (id: string) => `${API_BASE_URL}/borrows/${id}`
  },

};
