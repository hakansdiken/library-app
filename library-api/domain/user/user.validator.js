import bcrypt from 'bcrypt';

export class UserValidator {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async validateForRegister(userData) {

        const existingUser = await this.userRepository.findByEmail(userData.email);

        if (existingUser) {

            return { success: false, message: 'Email is already registered.' };
        }

        if (!userData.name) {

            return { success: false, message: 'Name is required!' };
        }

        if (!userData.surname) {

            return { success: false, message: 'Surname is required!' };
        }

        if (!userData.email) {

            return { success: false, message: 'Email is required!' };
        }

        if (!this.isValidEmail(userData.email)) {

            return { success: false, message: 'Invalid email!' };
        }

        if (!this.isValidPassword(userData.password)) {

            return { success: false, message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.' };
        }

        if (!this.isValidEmail(userData.email)) {

            return { success: false, message: 'Email format is invalid.' };
        }

        return { success: true };
    }

    async validateForLogin(email, password) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {

            return { success: false, message: 'User not found!' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {

            return { success: false, message: 'Invalid password!' };
        }

        return { success: true, user };
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    isValidPassword(password) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
    }
}
