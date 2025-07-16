export class UserDTO {

    static from(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            createdAt: user.created_at
        };
    }
}