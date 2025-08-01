import { UserCreateRequestDTO } from "../dtos/user/user-create.dto.js";
import { UserUpdateRequestDTO } from "../dtos/user/user-update.dto.js";
import { UserResponseDTO } from "../dtos/user/user.dto.js";

export class UserApplication {

    constructor(userService) {
        this.userService = userService;
    }

    async register(data) {
        const dto = new UserCreateRequestDTO(data);
        const result = await this.userService.register(dto);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: new UserResponseDTO(result.data)
        };
    }

    async login(email, password) {
        const result = await this.userService.login(email, password);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: result.message,
            data: new UserResponseDTO(result.data)
        };
    }

    async createUser(data, currentUserRole) {

        const dto = new UserCreateRequestDTO(data);
        const result = await this.userService.createUser(dto, currentUserRole);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: "User created successfully",
            data: new UserResponseDTO(result.data)
        };
    }

    async getAllUsers(page, limit) {

        const result = await this.userService.getAllUsers(page, limit);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: "Users fetched successfully.",
            data: result.data.map(user => new UserResponseDTO(user)),
            pagination: result.pagination
        };
    }

    async getUserById(id) {
        const result = await this.userService.getUserById(id);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: "User fetched successfully.",
            data: new UserResponseDTO(result.data)
        };
    }

    async updateUser(id, data) {

        const dto = new UserUpdateRequestDTO(data);
        const result = await this.userService.updateUser(id, dto);

        if (!result.success) {
            return result;
        }

        return {
            success: true,
            message: "User updated successfully.",
            data: new UserResponseDTO(result.data)
        };
    }

    async deleteUser(id) {

        const result = await this.userService.deleteUser(id);

        return result;
    }
}
