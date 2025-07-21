const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
  },
  USERS: {
    ROOT: `${API_BASE_URL}/users`,
    BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
    CREATE: `${API_BASE_URL}/users/create`,
    EDIT: (id: string) => `${API_BASE_URL}/users/edit/${id}`
  },
  BOOKS: {
    ROOT: `${API_BASE_URL}/books`,
    BY_ID: (id: string) => `${API_BASE_URL}/books/${id}`,
    CREATE: `${API_BASE_URL}/books/create`,
    EDIT: (id: string) => `${API_BASE_URL}/books/edit/${id}`
  },

};
