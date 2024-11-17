import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function OrderHistory() {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order.id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p>Status: {order.status}</p>
                            <p>Total: ${order.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
