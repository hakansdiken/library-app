import { pool } from '../../infrastructure/database.js';
import { UserFactory } from './user.factory.js';

export class UserRepository {

    async findByEmail(email) {

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async save(user) {

        const result = await pool.query(
            `INSERT INTO users (name, surname, email, password, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [user.name, user.surname, user.email, user.password, user.role]
        );

        return this._mapToEntity(result.rows[0]);
    }

    _mapToEntity(row) {
        return UserFactory.fromRow(row);
    }
}
