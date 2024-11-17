# E-commerce Full Stack Application

A modern e-commerce platform built with Node.js, Express, React, and SQLite.

## Features

- 🔐 JWT Authentication
- 🛍️ Product Management
- 🛒 Shopping Cart
- 📦 Order Processing
- 💳 Secure Checkout
- 📱 Responsive Design

## Tech Stack

### Backend
- Node.js & Express
- SQLite with better-sqlite3
- JWT Authentication
- Express Validator

### Frontend
- React with Vite
- React Query for API Management
- Tailwind CSS for Styling
- React Router for Navigation
- Headless UI Components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (auth required)

### Orders
- GET `/api/orders` - Get user orders (auth required)
- POST `/api/orders` - Create order (auth required)

## Environment Variables

Create a `.env` file with:
```
PORT=3000
JWT_SECRET=your-secret-key
```

## Project Structure

```
├── src/
│   ├── client/           # Frontend React code
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── api/         # API integration
│   └── server/          # Backend Express code
│       ├── routes/      # API routes
│       ├── middleware/  # Custom middleware
│       └── db/          # Database setup
├── public/              # Static assets
└── vite.config.js       # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License