
import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, isAdmin } from '../middleware/auth.js';
import db from '../db/init.js';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = stmt.get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product (admin only)
router.post(
    '/',
    auth,
    isAdmin,
    [
      body('name').notEmpty(),
      body('price').isFloat({ min: 0 }),
      body('stock').isInt({ min: 0 }),
    ],
    (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, price, stock } = req.body;
        const stmt = db.prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)');
        const result = stmt.run(name, description, price, stock);
        res.status(201).json({ id: result.lastInsertRowid });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
);

export default router;
