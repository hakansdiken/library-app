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

    async register(data) {

        const validation = await this.validator.validateForRegister(data);

        if (!validation.success) {

            return validation;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);// kullanıcıdan gelen şifre hashlendi

        const user = UserFactory.create(data, hashedPassword)

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

    async getAllUsers() {

        const users = await this.userRepository.findAll();

        return {
            success: true,
            message: "Users received successfully.",
            data: users.map(user => UserDTO.from(user))
        }
    }

    async getUserByEmail(email) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {

            return {
                success: false,
                message: "User not found!"
            };
        }

        return {
            success: true,
            message: "User received successfully.",
            data: users.map(user => UserDTO.from(user))
        }
    }

    async updateUser(email, data) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {

            return {
                success: false,
                message: "User not found!"
            };
        }


        const validation = await this.validator.validateForRegister(data);

        if (!validation.success) {

            return validation;
        }

        const updatedUser = await UserFactory.update(user, data);

        const savedUser = await this.userRepository.save(updatedUser);

        return {
            success: true,
            message: 'User updated successfully.',
            data: UserDTO.from(savedUser)
        };
    }
}
