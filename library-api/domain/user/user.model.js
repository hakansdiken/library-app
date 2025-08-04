export default class User {
    constructor({
        id,
        name,
        surname,
        email,
        password,
        role,
        createdAt,
        updatedAt,
        canBeDeleted
    }) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.canBeDeleted = canBeDeleted;
    }
}
