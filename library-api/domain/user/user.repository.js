import { pool } from '../../infrastructure/database.js';
import { BorrowStatus } from '../constants/borrow-status.js';
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

    async findAll(page, limit, search) {

        const offset = page * limit;
        const searchValue = `%${search || ''}%`;

        const countResult = await pool.query(`
            SELECT COUNT(*) 
            FROM users u
            WHERE (u.name ILIKE $1
                OR u.surname ILIKE $1
                OR u.email ILIKE $1)
                AND u.is_deleted = false
        `, [searchValue])

        const totalItems = Number(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit)
        // borrowun statusu borrowed ise canBeDeleted false olcak. 
        const result = await pool.query(`
                SELECT 
                    u.*,  
                    NOT EXISTS (
                    SELECT 1 
                    FROM borrows 
                    WHERE user_id = u.id AND status = 'borrowed'
                    ) AS "canBeDeleted"
                    FROM users u
                    WHERE ( u.name ILIKE $3
                    OR u.surname ILIKE $3
                    OR u.email ILIKE $3 )
                    AND u.is_deleted = false
                    ORDER BY u.created_at  
                    DESC LIMIT $1 OFFSET $2`,
            [limit, offset, searchValue]
        );

        if (result.rows.length === 0) {
            return {
                users: [],
                pagination: {
                    totalItems,
                    pageIndex: page,
                    totalPages,
                    itemsPerPage: limit,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            }
        }

        return {
            users: result.rows.map(row => this._mapToEntity(row)),
            pagination: {
                totalItems,
                pageIndex: page,
                totalPages,
                itemsPerPage: limit,
                hasNextPage: page < totalPages - 1,
                hasPrevPage: page > 0
            }
        }
    }

    async save(user) {

        const row = UserFactory.toRow(user);

        if (!user.id) {

            const result = await pool.query(
                `INSERT INTO users 
                (name, surname, email, password, role, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [
                    row.name,
                    row.surname,
                    row.email,
                    row.password,
                    row.role,
                    row.created_at,
                    row.updated_at
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
                    row.name,
                    row.surname,
                    row.email,
                    row.password,
                    row.role,
                    row.updated_at,
                    row.id
                ]
            );

            return this._mapToEntity(result.rows[0]);
        }
    }

    async hardDelete(id) {

        const borrowedCount = await pool.query(
            "SELECT COUNT(*) FROM borrows WHERE user_id = $1 AND status = $2",
            [id, BorrowStatus.BORROWED]
        );

        if (Number(borrowedCount.rows[0].count) > 0) {
            return { success: false };
        }

        await pool.query("DELETE FROM users WHERE id = $1", [id]);

        return { success: true };
    }

    async delete(id) {

        const borrowedCount = await pool.query(
            "SELECT COUNT(*) FROM borrows WHERE user_id = $1 AND status = $2",
            [id, BorrowStatus.BORROWED]
        );

        if (Number(borrowedCount.rows[0].count) > 0) {
            return { success: false };
        }

        await pool.query("UPDATE users SET is_deleted = true WHERE id = $1", [id]);

        return { success: true };
    }

    _mapToEntity(row) {

        return UserFactory.fromRow(row);
    }
}
