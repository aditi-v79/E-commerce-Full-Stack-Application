import Database from 'better-sqlite3';

const db = new Database('ecommerce.db');

function seedProducts() {
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      stock: 50
    },
    {
      name: 'Smartphone',
      description: 'Latest model with advanced camera system',
      price: 899.99,
      stock: 30
    },
    {
      name: 'Laptop',
      description: 'Powerful laptop for work and gaming',
      price: 1299.99,
      stock: 20
    },
    {
      name: 'Smartwatch',
      description: 'Fitness tracking and notifications on your wrist',
      price: 249.99,
      stock: 40
    },
    {
      name: 'Wireless Earbuds',
      description: 'Compact and comfortable with great sound quality',
      price: 149.99,
      stock: 60
    },
    {
      name: 'Tablet',
      description: 'Perfect for entertainment and productivity',
      price: 499.99,
      stock: 25
    }
  ];

  const stmt = db.prepare('INSERT OR IGNORE INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)');
  
  for (const product of products) {
    stmt.run(product.name, product.description, product.price, product.stock);
  }
}

export function initDb() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      stock INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `);

  // Seed products
  seedProducts();
}

export default db;