import { pool } from '../../infrastructure/database.js';
import { UserFactory } from './user.factory.js';

export class UserRepository {

    async findByEmail(email) {

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async findById(id) {

        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (result.rows.length === 0) return null;

        return this._mapToEntity(result.rows[0]);
    }

    async findAll() {

        const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");

        return result.rows.map(row => this._mapToEntity(row));
    }

    async save(user) {

        if (!user.id) {

            const result = await pool.query(
                `INSERT INTO 
                    users (name, surname, email, password, role, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *`,
                [
                    user.name,
                    user.surname,
                    user.email,
                    user.password,
                    user.role,
                    user.created_at,
                    user.updated_at
                ]
            );

            return this._mapToEntity(result.rows[0]);

        } else {

            const result = await pool.query(
                `UPDATE users SET 
                    name = $1, surname = $2, email = $3, password = $4, role = $5, updated_at = $6
                    WHERE id = $7 
                    RETURNING *`,
                [
                    user.name,
                    user.surname,
                    user.email,
                    user.password,
                    user.role,
                    user.updated_at,
                    user.id
                ]
            );

            return this._mapToEntity(result.rows[0]);
        }

    }

    async delete(id) {

        await pool.query("DELETE FROM users WHERE id = $1", [id]);

    }

    _mapToEntity(row) {
        return UserFactory.fromRow(row);
    }
}
