import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth.js';
import db from '../db/init.js';

const router = express.Router();

// Get user orders
router.get('/', auth, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT o.*, oi.product_id, oi.quantity, oi.price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
    `);
    const orders = stmt.all(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create order
router.post('/',
  auth,
  [
    body('items').isArray(),
    body('items.*.product_id').isInt(),
    body('items.*.quantity').isInt({ min: 1 })
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      db.transaction(() => {
        let total = 0;
        const { items } = req.body;

        // Calculate total and check stock
        for (const item of items) {
          const product = db.prepare('SELECT price, stock FROM products WHERE id = ?').get(item.product_id);
          
          if (!product || product.stock < item.quantity) {
            throw new Error('Invalid product or insufficient stock');
          }
          
          total += product.price * item.quantity;
          
          // Update stock
          db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?')
            .run(item.quantity, item.product_id);
        }

        // Create order
        const orderStmt = db.prepare('INSERT INTO orders (user_id, status, total) VALUES (?, ?, ?)');
        const orderResult = orderStmt.run(req.user.id, 'pending', total);

        // Create order items
        const itemStmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
        for (const item of items) {
          const product = db.prepare('SELECT price FROM products WHERE id = ?').get(item.product_id);
          itemStmt.run(orderResult.lastInsertRowid, item.product_id, item.quantity, product.price);
        }

        return orderResult.lastInsertRowid;
      })();

      res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

export default router;