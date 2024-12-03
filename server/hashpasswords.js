import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';

// Get the correct directory of the current script
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Explicitly point to the correct ecommerce.db
const dbPath = path.resolve(__dirname, '../ecommerce.db');
const db = new Database(dbPath); // Connect to the correct database

// Fetch all users
const users = db.prepare('SELECT * FROM users').all();

// Hash and update passwords
(async () => {
    try {
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 8);
            db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, user.id);
            console.log(`Password updated for user: ${user.email}`);
        }
        console.log('All passwords updated successfully!');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
})();
