export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    createdAt?: string; 
}

export interface UserWithPassword {
    id?: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    role?: 'admin' | 'librarian' | 'member';
    createdAt?: string;

}