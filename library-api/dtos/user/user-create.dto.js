export class UserCreateRequestDTO {
  constructor({ name, surname, email, password }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }
}
