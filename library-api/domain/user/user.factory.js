import User from './user.model.js';

export class UserFactory {

    static create(data, hashedPassword) {
        return new User({
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role ?? 'member',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static update(existUser, data) {
        existUser.name = data.name ?? existUser.name;
        existUser.surname = data.surname ?? existUser.surname;
        existUser.email = data.email ?? existUser.email;
        existUser.role = data.role ?? existUser.role;
        existUser.updatedAt = new Date();

        return existUser;
    }

    static fromRow(row) {
        return new User({
            id: row.id,
            name: row.name,
            surname: row.surname,
            email: row.email,
            role: row.role,
            password: row.password,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            canBeDeleted: row.canBeDeleted
        });
    }

    static toRow(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            password: user.password,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        };
    }
}
