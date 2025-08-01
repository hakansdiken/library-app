import bcrypt from 'bcrypt';
import { UserFactory } from './user.factory.js';
import { UserUpdateRequestDTO } from '../../dtos/user/user-update.dto.js';

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
            message: 'User registered successfully',
            data: savedUser
        };
    }

    async login(email, password) {


        const user = await this.userRepository.findByEmail(email);

        if (!user) {

            return { success: false, message: 'User not found!' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {

            return { success: false, message: 'Invalid password!' };
        }

        return {
            success: true,
            message: 'User login successfully',
            data: user
        };
    }

    async createUser(data) {

        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {

            return { success: false, message: 'Email is already registered.' };
        }

        const validation = await this.userValidator.validateForRegister(data);

        if (!validation.success) {

            return validation;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = UserFactory.create(data, hashedPassword)

        const savedUser = await this.userRepository.save(user);

        return {
            success: true,
            message: 'User created successfully',
            data: savedUser
        };
    }

    async getAllUsers(page, limit) {

        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
            return {
                success: false,
                message: "Page number must be a positive integer."
            };
        }

        if (isNaN(limit) || limit < 1) {
            return {
                success: false,
                message: "Limit must be a positive integer."
            };
        }

        const data = await this.userRepository.findAll(page, limit);

        return {
            success: true,
            message: 'Users fetched successfully',
            data: data.users,
            pagination: data.pagination,
        };
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
            message: 'User fetched successfully',
            data: user
        };
    }

    async updateUser(id, data) {

        const user = await this.userRepository.findById(id);

        if (!user) {

            return {
                success: false,
                message: 'User not found!'
            };
        }

        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser && existingUser.id !== id) {

            return { success: false, message: 'Email is already registered by another user.' };
        }

        const dto = new UserUpdateRequestDTO(data);

        const validation = await this.userValidator.validateForUpdate(dto);

        if (!validation.success) {

            return validation;
        }

        const updatedUser = await UserFactory.update(user, dto);

        const savedUser = await this.userRepository.save(updatedUser);

        return {
            success: true,
            message: 'User updated successfully',
            data: savedUser
        };
    }

    async deleteUser(id) {

        const user = await this.userRepository.findById(id);

        if (!user) {

            return {
                success: false,
                message: "User not found!"
            }
        }

        await this.userRepository.delete(id);

        return {
            success: true,
            message: "User deleted successfully."
        }
    }
}
