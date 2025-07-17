import { User } from "./user.model";

export interface RegisterRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: User;
}
