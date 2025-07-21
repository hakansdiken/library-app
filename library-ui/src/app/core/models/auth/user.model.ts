export interface User {
    id?: string;
    name: string;
    surname: string;
    email: string;
    role?: 'admin' | 'librarian' | 'member';
}

export interface UserWithPassword {
    id?: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    role?: 'admin' | 'librarian' | 'member';
}