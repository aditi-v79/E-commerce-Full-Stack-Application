import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
    const { token } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [success, setSuccess] = useState(false);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:3000/api/products',
                { name, description, price: parseFloat(price), stock: parseInt(stock) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(true);
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            {success && <p className="text-green-500 mb-4">Product added successfully!</p>}
            <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
