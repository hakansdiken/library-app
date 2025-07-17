import { User } from "./user.model";

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: User;
}
