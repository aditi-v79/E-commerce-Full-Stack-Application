import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import db from '../db/init.js';

const router = express.Router();

// Register
router.post(
    '/register',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 6 }),
      body('name').notEmpty(),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const stmt = db.prepare('INSERT INTO users (email, password, name, is_admin) VALUES (?, ?, ?, 0)');
        const result = stmt.run(email, hashedPassword, name);

        const token = jwt.sign(
            { id: result.lastInsertRowid, is_admin: 0 },
            process.env.JWT_SECRET || 'your-secret-key'
        );
        res.status(201).json({ token });
      } catch (err) {
        console.error('Registration Error:', err.message); // Debug
        res.status(400).json({ error: err.message });
      }
    }
);

// Login
router.post(
    '/login',
    [body('email').isEmail(), body('password').exists()],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = stmt.get(email);

        console.log('User Data on Login:', user); // Debug

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, is_admin: user.is_admin },
            process.env.JWT_SECRET || 'your-secret-key'
        );

        res.json({ token });
      } catch (err) {
        console.error('Login Error:', err.message); // Debug
        res.status(400).json({ error: err.message });
      }
    }
);

export default router;
