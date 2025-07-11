import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository.js';
import { UserValidator } from './user.validator.js';
import { UserDTO } from './user.dto.js';
import { UserFactory } from './user.factory.js';

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

        const user = UserFactory.create(userData, hashedPassword)

        const savedUser = await this.userRepository.save(user);

        return {
            success: true,
            message: 'User registered successfully.',
            data: UserDTO.from(savedUser)
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
            data: UserDTO.from(validation.user)
        };
    }
}
