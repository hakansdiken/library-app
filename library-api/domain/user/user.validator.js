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

        if (!userData.password) {

            return { success: false, message: 'Password is required!' };
        }

        if (!this.isValidEmail(userData.email)) {

            return { success: false, message: 'Invalid email!' };
        }

        if (!userData.password || userData.password.length < 6) {

            return { success: false, message: 'Password must be longer than 6 characters!' };
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

        return { success: true, user};
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}
