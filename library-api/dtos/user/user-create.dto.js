export class UserCreateRequestDTO {
  constructor({ name, surname, email, role, password }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.password = password;
  }
}
