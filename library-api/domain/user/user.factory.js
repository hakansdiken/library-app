import User from "./user.model.js";

export class UserFactory {
    static create(data, hashedPassword) {

        return new User({
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role ?? 'member',
            password: hashedPassword
        });
    }
    static fromRow(row) {

        return new User({
            id: row.id,
            name: row.name,
            surname: row.surname,
            email: row.email,
            role: row.role,
            password: row.password
        });
    }
}