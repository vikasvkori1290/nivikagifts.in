import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any gifts yet.</p>
                <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-600">Product</th>
                                        <th className="p-4 font-semibold text-gray-600">Price</th>
                                        <th className="p-4 font-semibold text-gray-600">Quantity</th>
                                        <th className="p-4 font-semibold text-gray-600">Total</th>
                                        <th className="p-4 font-semibold text-gray-600"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <tr key={item.product._id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                                        {item.product.images?.[0] ? (
                                                            <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                                        <p className="text-sm text-gray-500">{item.product.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600">₹{item.price}</td>
                                            <td className="p-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                                                    className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </td>
                                            <td className="p-4 font-bold text-gray-800">₹{item.price * item.quantity}</td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => removeFromCart(item.product._id)} className="text-red-500 hover:text-red-700">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{getCartTotal()}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex justify-between mb-6">
                            <span className="text-lg font-bold text-gray-800">Total</span>
                            <span className="text-xl font-bold text-blue-600">₹{getCartTotal()}</span>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
                            Proceed to Checkout <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
