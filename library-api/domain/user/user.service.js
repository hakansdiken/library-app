import bcrypt from 'bcrypt';
import { UserDTO } from './user.dto.js';
import { UserFactory } from './user.factory.js';

export class UserService {
    constructor(userRepository, userValidator) {
        this.userRepository = userRepository;
        this.userValidator = userValidator;
    }

    async register(data) {

        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {

            return { success: false, message: 'Email is already registered.' };
        }

        const validation = await this.userValidator.validateForRegister(data);

        if (!validation.success) {

            return validation;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);// kullanıcıdan gelen şifre hashlendi

        const user = UserFactory.create(data, hashedPassword)

        const savedUser = await this.userRepository.save(user);

        return {
            success: true,
            message: "User registered successfully.",
            data: UserDTO.from(savedUser)
        };
    }

    async login(email, password) {

        const validation = await this.userValidator.validateForLogin(email, password)

        if (!validation.success) {

            return validation;
        }

        return {
            success: true,
            message: "Login successful.",
            data: UserDTO.from(validation.user)
        };
    }

    async getAllUsers() {

        const users = await this.userRepository.findAll();

        return {
            success: true,
            message: "Users fetched successfully.",
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
            message: "User fetched successfully.",
            data: users.map(user => UserDTO.from(user))
        }
    }

    async getUserById(id) {

        const user = await this.userRepository.findById(id);

        if (!user) {
            return {
                success: false,
                message: "User not found!"
            };
        }

        return {
            success: true,
            message: "User fetched successfully.",
            data: UserDTO.from(user)
        }
    }

    async updateUser(id, data) {

        const user = await this.userRepository.findById(id);

        if (!user) {

            return {
                success: false,
                message: "User not found!"
            };
        }

        const validation = await this.userValidator.validateForRegister(data);

        if (!validation.success) {

            return validation;
        }

        const updatedUser = await UserFactory.update(user, data);

        const savedUser = await this.userRepository.save(updatedUser);

        return {
            success: true,
            message: "User updated successfully.",
            data: UserDTO.from(savedUser)
        };
    }

    async deleteUser(email) {

        const user = await this.userRepository.findById(id);

        if (!user) {

            return {
                success: false,
                message: "User not found!"
            }
        }

        await this.userRepository.delete(email);

        return {
            success: true,
            message: "User deleted successfully."
        }
    }
}
