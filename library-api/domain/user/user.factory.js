import User from "./user.model.js";

export class UserFactory {
    static create(data, hashedPassword) {

        return new User({
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role ?? 'member',
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static update(data, existUser) {

        existUser.name = data.name ?? existUser.name;
        existUser.surname = data.surname ?? existUser.surname;
        existUser.email = data.email ?? existUser.email;
        existUser.role = data.role ?? existUser.role;
        existUser.updated_at = new Date();

        return user;
    }

    static fromRow(row) {

        return new User({
            id: row.id,
            name: row.name,
            surname: row.surname,
            email: row.email,
            role: row.role,
            password: row.password,
            created_at: row.created_at,
            updated_at: row.updated_at
        });
    }


}