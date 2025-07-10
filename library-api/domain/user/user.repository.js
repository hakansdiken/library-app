import User from './user.model.js';
import { pool } from '../../infrastructure/database.js'; 

export class UserRepository {

    async findByEmail(email) {
        
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async save(user) {

        const result = await pool.query(
            `INSERT INTO users (name, surname, email, password)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [user.name, user.surname, user.email, user.password]
        );

        return this._mapToEntity(result.rows[0]);
    }

    _mapToEntity(row) {
        return new User({
            id: row.id,
            name: row.name,
            surname: row.surname,
            email: row.email,
            password: row.password
        });
    }
}
