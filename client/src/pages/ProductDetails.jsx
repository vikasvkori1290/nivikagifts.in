import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaTag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [pricePerUnit, setPricePerUnit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setPricePerUnit(data.basePrice);
                setTotalPrice(data.basePrice);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!product) return;

        let calculatedPrice = product.basePrice;

        if (product.pricingTiers && product.pricingTiers.length > 0) {
            const sortedTiers = [...product.pricingTiers].sort((a, b) => b.minQuantity - a.minQuantity);

            for (const tier of sortedTiers) {
                if (quantity >= tier.minQuantity) {
                    calculatedPrice = tier.pricePerUnit;
                    break;
                }
            }
        }

        setPricePerUnit(calculatedPrice);
        setTotalPrice(calculatedPrice * quantity);

    }, [quantity, product]);

    const handleQuantityChange = (e) => {
        const val = parseInt(e.target.value);
        setQuantity(val > 0 ? val : 1);
    };

    const handleAddToCart = () => {
        alert(`Added ${quantity} items to cart! Total: ₹${totalPrice}`);
    };

    if (loading) return <div className="text-center py-20 text-xl font-semibold text-gray-500">Loading Product...</div>;
    if (!product) return <div className="text-center py-20 text-xl font-semibold text-red-500">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="md:flex">
                    {/* Left: Image Section */}
                    <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-8">
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="max-h-96 object-contain rounded-lg hover:scale-105 transition-transform duration-300 shadow-sm"
                            />
                        ) : (
                            <div className="h-64 w-full flex items-center justify-center bg-gray-200 text-gray-400 rounded-lg">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Right: Details Section */}
                    <div className="md:w-1/2 p-8 space-y-6">
                        <div>
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <p className="text-sm text-blue-500 font-medium mt-1 uppercase tracking-wide">{product.category}</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Pricing Tiers Table */}
                        {product.pricingTiers && product.pricingTiers.length > 0 && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h3 className="flex items-center text-lg font-semibold text-blue-800 mb-3">
                                    <FaTag className="mr-2" /> Bulk Discounts
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left">
                                        <thead className="text-xs text-blue-700 uppercase bg-blue-100">
                                            <tr>
                                                <th className="px-4 py-2 rounded-l-md">Quantity</th>
                                                <th className="px-4 py-2 rounded-r-md">Price / Unit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-blue-200">
                                                <td className="px-4 py-2 font-medium">1+ (Base)</td>
                                                <td className="px-4 py-2">₹{product.basePrice}</td>
                                            </tr>
                                            {product.pricingTiers
                                                .sort((a, b) => a.minQuantity - b.minQuantity)
                                                .map((tier, index) => (
                                                    <tr key={index} className="border-b border-blue-200 last:border-0 hover:bg-blue-100 transition-colors">
                                                        <td className="px-4 py-2 font-medium">{tier.minQuantity}+ items</td>
                                                        <td className="px-4 py-2 font-bold text-blue-600">₹{tier.pricePerUnit}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Calculation & Action Area */}
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-1/2">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="w-1/2 text-right">
                                    <p className="text-sm text-gray-500">Current Rate</p>
                                    <p className="text-xl font-bold text-gray-900">₹{pricePerUnit}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Payable</p>
                                    <p className="text-3xl font-bold text-blue-600">₹{totalPrice}</p>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className={`flex items-center px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all transform hover:-translate-y-0.5 ${product.inStock
                                        ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
                                        : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
