import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository.js';
import { UserValidator } from './user.validator.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.validator = new UserValidator(this.userRepository);
    }

    async register(userData) {

        const validation = await this.validator.validateForRegister(userData);

        if (!validation.success) {
            return validation;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);// kullanıcıdan gelen şifre hashlendi

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

        const validation = await this.validator.validateForLogin(email, password)

        if (!validation.success) {
            
            return validation;
        }

        return {
            success: true,
            message: 'Login successful.',
            data: validation.user
        };
    }
}
