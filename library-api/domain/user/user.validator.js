export class UserValidator {

    async validateForRegister(userData) {

        if (!userData.name) {

            return { success: false, message: 'Name is required!' };
        }

        if (!userData.surname) {

            return { success: false, message: 'Surname is required!' };
        }

        if (!userData.email) {

            return { success: false, message: 'Email is required!' };
        }

        if (!this.isValidPassword(userData.password)) {

            return { success: false, message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.' };
        }

        if (!this.isValidEmail(userData.email)) {

            return { success: false, message: 'Email format is invalid.' };
        }

        return { success: true };
    }

    async validateForUpdate(userData) {

        if (userData.email && !this.isValidEmail(userData.email)) {

            return { success: false, message: 'Email format is invalid.' };
        }
        if (userData.password && !this.isValidPassword(userData.password)) {

            return { success: false, message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.' };
        }

        return { success: true };
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
