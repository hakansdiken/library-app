export class UserResponseDTO {
  constructor({ id, name, surname, email, role, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
