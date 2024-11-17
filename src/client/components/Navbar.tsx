import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              E-Shop
            </Link>
            <Link to="/products" className="ml-8 text-gray-600 hover:text-gray-800">
              Products
            </Link>
            <Link to="/orders" className="ml-8 text-gray-600 hover:text-gray-800">
              Orders
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="text-gray-600 hover:text-gray-800 relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="ml-8 text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="ml-8 text-gray-600 hover:text-gray-800">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}