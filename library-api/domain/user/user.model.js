export default class User {
    constructor({
        id,
        name,
        surname,
        email,
        password,
        role
    }) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
