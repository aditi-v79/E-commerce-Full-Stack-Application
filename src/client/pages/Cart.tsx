import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();
  const { token } = useAuth();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!token) {
      alert('Please login to proceed to checkout.');
      return;
    }

    try {
      const response = await axios.post(
          'http://localhost:3000/api/orders',
          { items },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed successfully!');
      clearCart(); // Clear cart after successful order
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place the order. Please try again later.');
    }
  };

  return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
        ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                    >
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                ))}
              </div>
              <div className="mt-8 bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
                <button
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
        )}
      </div>
  );
}
