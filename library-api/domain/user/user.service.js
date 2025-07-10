import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData) {

        const existingUser = await this.userRepository.findByEmail(userData.email);

        if (existingUser) {

            return { success: false, message: 'Email already registered!' };
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);// kullanıcıdan gelen şifreyi hashledik.

        const user = {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            password: hashedPassword
        };

        const savedUser = await this.userRepository.save(user);

        return {
            success: true,
            message: 'User registered successfully.',
            data: savedUser
        };
    }

    async login(email, password) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {

            return { success: false, message: 'Invalid password!' };
        }

        return {
            success: true,
            message: 'Login successful.',
            data: user
        };
    }
}
