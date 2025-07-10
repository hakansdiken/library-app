import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { pool } from '../database.js';

const PgSession = pgSession(session); // kütüphaneleri birbirine entegre ediyoruz

export const sessionMiddleware = session({ //express-session kendi içinde next() fonksiyonunu çağırıyor
    store: new PgSession({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, //Eğer session’da bir değişiklik yapılmazsa tekrar  kaydetme. 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
});
